import * as fs from 'fs';
import { parse } from 'fast-csv';
import { ParsedMail, simpleParser } from 'mailparser';
import { getFrom, getTo } from './utils';
import * as dayjs from 'dayjs';
import { ChartConfiguration } from 'chart.js';
import { ChartCallback, ChartJSNodeCanvas } from 'chartjs-node-canvas';

const raptorMessages = new Map<
  string,
  { id: string; from: string[]; to: string[] }
>();
const mailCountMessages = new Map<string, number>();
const dateCountMessages = new Map<string, number>();

new Promise((resolve, reject) => {
  const inputStream = fs.createReadStream(`./coursework/emails.csv`, 'utf-8');

  const parser = parse({
    delimiter: ',',
    headers: true,
    ignoreEmpty: true,
    trim: true,
  });

  let count = 0;

  inputStream
    .pipe(parser)
    .transform(async (row: { file: string; message: string }, next) => {
      try {
        const mail = await simpleParser(row.message, { objectMode: true });

        next(null, mail);
      } catch (e) {
        return next(e);
      }
    })
    .on('data', (email: ParsedMail) => {
      if (email.text?.toLowerCase().includes('raptor')) {
        raptorMessages.set(email.messageId, {
          id: email.messageId,
          from: getFrom(email),
          to: getTo(email),
        });
      }

      if (email.date) {
        const dateString = dayjs(email.date).format('DD-MM-YYYY');

        const value = dateCountMessages.get(dateString);

        if (value) {
          dateCountMessages.set(dateString, value + 1);
        } else {
          dateCountMessages.set(dateString, 1);
        }
      }

      getTo(email).forEach((address) => {
        const value = mailCountMessages.get(address);

        if (value) {
          mailCountMessages.set(address, value + 1);
        } else {
          mailCountMessages.set(address, 1);
        }
      });

      count++;
      if (count === 20_000) {
        inputStream.destroy();
        resolve(null);
      }
    })
    .on('end', function () {
      resolve(null);
    })
    .on('close', () => {
      resolve(null);
    })
    .on('error', (err) => {
      reject(err);
    });
})
  .then(() => {
    console.log('Raptor messages count', raptorMessages.size);

    const activeReceivers = Array.from(mailCountMessages.entries())
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 10);
    console.log('Most active receivers', activeReceivers);
  })
  .then(() => {
    const data = Array.from(dateCountMessages.entries())
      .map(([date, count]) => ({
        x: date,
        y: count,
      }))
      .sort((a, b) =>
        dayjs(a.x, 'DD-MM-YYYY').isBefore(dayjs(b.x, 'DD-MM-YYYY')) ? -1 : 1,
      );

    const width = 1920;
    const height = 1080;

    const configuration: ChartConfiguration<'bar', any> = {
      type: 'bar',
      data: {
        labels: Array.from(dateCountMessages.keys()),
        datasets: [
          {
            label: 'Number of messages',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 5,
          },
        ],
      },
      options: {},
      plugins: [
        {
          id: 'background-colour',
          beforeDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
          },
        },
      ],
    };

    const chartCallback: ChartCallback = (ChartJS) => {
      ChartJS.defaults.responsive = true;
      ChartJS.defaults.maintainAspectRatio = false;
    };

    const chartJSNodeCanvas = new ChartJSNodeCanvas({
      width,
      height,
      chartCallback,
    });

    return chartJSNodeCanvas.renderToBuffer(configuration);
  })
  .then((buffer) => {
    return fs.promises.writeFile(
      './date-to-count-messages.png',
      buffer,
      'base64',
    );
  });

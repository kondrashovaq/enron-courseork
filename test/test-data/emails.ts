import { ParsedMail } from 'mailparser';

export const raptorMail1: ParsedMail = {
  attachments: [],
  headers: new Map(),
  headerLines: [],
  text:
    '---------------------- Forwarded by Phillip K Allen/HOU/ECT on 11/01/2000 \n' +
    '11:33 AM ---------------------------\n' +
    '\n' +
    '\n' +
    'Jeff Raptor Richter\n' +
    '10/20/2000 02:16 PM\n' +
    'To: Phillip K Allen/HOU/ECT@ECT\n' +
    'cc:  \n' +
    'Subject: Generation\n' +
    '\n' +
    'http://westpower.enron.com/ca/generation/default.asp',
  textAsHtml: '',
  subject: 'Generation',
  date: new Date('2000-11-01T11:34:00.000Z'),
  to: {
    value: [
      { address: 'moshuffle@hotmail.com', name: '' },
      { address: 'paul.lucci@enron.com', name: '' },
    ],
    html: '',
    text: '',
  },
  from: {
    value: [{ address: 'phillip.allen@enron.com', name: '' }],
    html: '',
    text: 'phillip.allen@enron.com',
  },
  messageId: '<20826693.1075855687016.JavaMail.evans@thyme>',
  html: false,
};

export const raptorMail2: ParsedMail = {
  attachments: [],
  headers: new Map(),
  headerLines: [],
  text: 'mac,\n\nWe will be there on the 9th and I will bring the raptor paperwork.',
  textAsHtml: '',
  subject: 'Generation',
  date: new Date('2000-11-01T11:34:00.000Z'),
  to: {
    value: [
      { address: 'paul.lucci@enron.com', name: '' },
      { address: 'moshuffle@hotmail.com', name: '' },
    ],
    html: '',
    text: '',
  },
  from: {
    value: [{ address: 'phillip.allen@enron.com', name: '' }],
    html: '',
    text: '',
  },
  messageId: '<13455757.1075855671541.JavaMail.evans@thyme>',
  html: false,
};

export const clearMail1: ParsedMail = {
  attachments: [],
  headers: new Map(),
  headerLines: [],
  text: 'I checked into executing my options with Smith Barney.  Bad news.  Enron has',
  textAsHtml: '',
  subject: 'Generation',
  date: new Date('2001-01-12T11:34:00.000Z'),
  to: {
    value: [
      { address: 'paul.lucci@enron.com', name: '' },
      { address: 'david.delainey@enron.com', name: '' },
    ],
    html: '',
    text: '',
  },
  from: {
    value: [{ address: 'mike.grigsby@enron.com', name: '' }],
    html: '',
    text: '',
  },
  messageId: '<27598897.1075855671563.JavaMail.evans@thyme>',
  html: false,
};

export const clearMail2: ParsedMail = {
  attachments: [],
  headers: new Map(),
  headerLines: [],
  text: 'Could we set up an inspection for this Friday at 2:00?',
  textAsHtml: '',
  subject: 'Generation',
  date: new Date('2000-05-13T11:34:00.000Z'),
  to: {
    value: [
      { address: 'paul.lucci@enron.com', name: '' },
      { address: 'kenneth.shulklapper@enron.com', name: '' },
    ],
    html: '',
    text: '',
  },
  from: {
    value: [{ address: 'moshuffle@hotmail.com', name: '' }],
    html: '',
    text: '',
  },
  messageId: '<31751710.1075855671584.JavaMail.evans@thyme>',
  html: false,
};

export const emails: ParsedMail[] = [
  raptorMail1,
  raptorMail2,
  clearMail1,
  clearMail2,
];

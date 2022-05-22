/**
  01-11-2000 = 2
  12-01-2001 = 1
  13-05-2000 = 1
*/

import { emails } from '../test-data';
import * as dayjs from 'dayjs';

const dateCountMessages = new Map<string, number>();

describe('messages by date', () => {
  beforeEach(() => {
    dateCountMessages.clear();
    emails.forEach((mail) => {
      if (mail.date) {
        const dateString = dayjs(mail.date).format('DD-MM-YYYY');

        const value = dateCountMessages.get(dateString);

        if (value) {
          dateCountMessages.set(dateString, value + 1);
        } else {
          dateCountMessages.set(dateString, 1);
        }
      }
    });
  });

  it('date with received messages', () => {
    expect(dateCountMessages.get('01-11-2000')).toBe(2);
    expect(dateCountMessages.get('12-01-2001')).toBe(1);
    expect(dateCountMessages.get('13-05-2000')).toBe(1);
  });
});

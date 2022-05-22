/**
  Count raptor messages = 2
 */

import { emails } from '../test-data';
import { getFrom, getTo } from '../../src/utils';

export const dateCountMessages = new Map<
  string,
  { id: string; from: string[]; to: string[] }
>();

describe('Search raptor', () => {
  beforeEach(() => {
    dateCountMessages.clear();
    emails.forEach((mail) => {
      if (mail.text?.toLowerCase().includes('raptor')) {
        dateCountMessages.set(mail.messageId, {
          id: mail.messageId,
          from: getFrom(mail),
          to: getTo(mail),
        });
      }
    });
  });

  it('Number of raptor messages', () => {
    expect(dateCountMessages.size).toBe(2);
  });
});

import { emails } from '../test-data';
import { getTo } from '../../src/utils';

/**
 * Most active receiver is "paul.lucci@enron.com"
 */

export const mailCountMessages = new Map<string, number>();

describe('Active receivers', () => {
  beforeEach(() => {
    mailCountMessages.clear();
    emails.forEach((email) => {
      getTo(email).forEach((address) => {
        const value = mailCountMessages.get(address);

        if (value) {
          mailCountMessages.set(address, value + 1);
        } else {
          mailCountMessages.set(address, 1);
        }
      });
    });
  });

  it('paul.lucci@enron.com', () => {
    expect(mailCountMessages.get('paul.lucci@enron.com')).toBe(4);
  });
});

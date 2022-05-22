import { ParsedMail } from 'mailparser';

export const getFrom: (email: ParsedMail) => string[] = (email) => {
  return email.from?.value?.map((value) => value.address) || [];
};

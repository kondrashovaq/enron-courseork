import { ParsedMail } from 'mailparser';

export const getTo: (mail: ParsedMail) => string[] = (mail) => {
  const to: string[] = [];

  if (Array.isArray(mail.to)) {
    mail.to?.forEach((address) => {
      address.value?.forEach(({ address }) => to.push(address));
    });
  } else {
    mail.to?.value?.forEach(({ address }) => to.push(address));
  }

  return to;
};

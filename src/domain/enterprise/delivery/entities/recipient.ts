import { randomUUID } from 'node:crypto';

export interface RecipientProps {
  name: string;
}

export class Recipient {
  id: string;
  name: string;

  constructor({ name }: RecipientProps, id?: string) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}

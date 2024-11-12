import { randomUUID } from 'node:crypto';

export interface AdminProps {
  name: string;
}

export class Admin {
  id: string;
  name: string;

  constructor({ name }: AdminProps, id?: string) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}

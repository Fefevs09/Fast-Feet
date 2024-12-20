import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface RecipientProps {
  name: string;
  cpf: string;
}

export class Recipient extends Entity<RecipientProps> {
  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(props, id);

    return recipient;
  }
}

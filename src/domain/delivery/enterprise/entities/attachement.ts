import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface AttachementProps {
  link: string;
}

export class Attachement extends Entity<AttachementProps> {
  get id(): UniqueEntityID {
    return this.id;
  }
  get link(): string {
    return this.link;
  }

  static create(props: AttachementProps, id?: UniqueEntityID) {
    const attachement = new Attachement(props, id);

    return attachement;
  }
}

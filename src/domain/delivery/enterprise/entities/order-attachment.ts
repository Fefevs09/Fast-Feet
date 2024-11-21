import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface OrderAttachmentProps {
  orderId: UniqueEntityID;
  attachmentId: UniqueEntityID;
}

export class OrderAttachment extends Entity<OrderAttachmentProps> {
  get orderId(): UniqueEntityID {
    return this.props.orderId;
  }
  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: OrderAttachmentProps, id?: UniqueEntityID) {
    const attachement = new OrderAttachment(props, id);

    return attachement;
  }
}

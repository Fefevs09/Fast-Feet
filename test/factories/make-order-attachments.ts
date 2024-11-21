import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  OrderAttachment,
  OrderAttachmentProps,
} from '@/domain/delivery/enterprise/entities/order-attachment';

export function makeOrdersAttachments(
  override: Partial<OrderAttachmentProps> = {},
  orderAttachmentId?: UniqueEntityID,
) {
  const orders = OrderAttachment.create(
    {
      attachmentId: new UniqueEntityID(),
      orderId: new UniqueEntityID(),
      ...override,
    },
    orderAttachmentId,
  );

  return orders;
}

import { OrderAttachmentsRepository } from '@/domain/delivery/application/repositories/order-attachments-repository';
import { OrderAttachment } from '@/domain/delivery/enterprise/entities/order-attachment';

export class InMemoryOrderAttachmentsRepository
  implements OrderAttachmentsRepository
{
  public items: OrderAttachment[] = [];
  async findManyByOrderId(orderId: string): Promise<OrderAttachment[]> {
    const orderAttachments = this.items.filter(
      (item) => item.orderId.toString() === orderId,
    );

    return orderAttachments;
  }
}

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

  async deleteManyByOrderId(orderId: string): Promise<void> {
    const orderAttachments = this.items.filter(
      (item) => item.orderId.toString() !== orderId,
    );

    this.items = orderAttachments;
  }
}

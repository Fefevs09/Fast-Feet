import { PaginationParams } from '@/core/repositories/pagination-params';
import { OrderAttachmentsRepository } from '@/domain/delivery/application/repositories/order-attachments-repository';
import { OrderRepository } from '@/domain/delivery/application/repositories/order-repository';
import { Order } from '@/domain/delivery/enterprise/entities/order';

export class InMemoryOrderRepository implements OrderRepository {
  constructor(private orderAttachmentsRepository: OrderAttachmentsRepository) {}
  public items: Order[] = [];

  async create(order: Order): Promise<void> {
    this.items.push(order);
  }
  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.id.toString() === id);
    if (!order) return null;

    return order;
  }

  async save(order: Order): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === order.id);
    this.items[itemIndex] = order;
  }

  async delete(order: Order): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === order.id);

    this.items.splice(itemIndex, 1);

    this.orderAttachmentsRepository.deleteManyByOrderId(order.id.toString());
  }

  async findManyRecent({ page }: PaginationParams): Promise<Order[]> {
    const orders = this.items
      .sort((a, b) => b.postDate.getTime() - a.postDate.getTime())
      .slice((page - 1) * 20, page * 20);

    return orders;
  }
}

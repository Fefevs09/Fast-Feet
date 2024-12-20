import { PaginationParams } from '@/core/repositories/pagination-params';
import { Order } from '../../enterprise/entities/order';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>;
  abstract findById(id: string): Promise<Order | null>;
  abstract save(order: Order): Promise<void>;
  abstract delete(order: Order): Promise<void>;
  abstract findManyRecent(params: PaginationParams): Promise<Order[]>;
}

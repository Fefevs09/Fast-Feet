import { OrderRepository } from '../repositories/order-repository';
import { Order } from '../../enterprise/entities/order';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface CreateOrderUseCaseRequest {
  recipientId: string;
  address: string;
}

interface CreateOrderUseCaseResponse {
  order: Order;
}

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    recipientId,
    address,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      recipientId: new UniqueEntityID(recipientId),
      address,
    });

    await this.orderRepository.create(order);
    return {
      order,
    };
  }
}

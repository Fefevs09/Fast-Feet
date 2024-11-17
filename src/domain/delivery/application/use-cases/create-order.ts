import { OrderRepository } from '../repositories/order-repository';
import { Order } from '../../enterprise/entities/order';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@/core/either';

interface CreateOrderUseCaseRequest {
  recipientId: string;
  address: string;
}

type CreateOrderUseCaseResponse = Either<
  null,
  {
    order: Order;
  }
>;

@Injectable()
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
    return right({
      order,
    });
  }
}

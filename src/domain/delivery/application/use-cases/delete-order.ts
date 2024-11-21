import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { OrderRepository } from '../repositories/order-repository';
import { Injectable } from '@nestjs/common';

interface DeleteOrderUseCaseRequest {
  orderId: string;
}

type DeleteOrderUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>;

@Injectable()
export class DeleteOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    orderId,
  }: DeleteOrderUseCaseRequest): Promise<DeleteOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      return left(new ResourceNotFoundError());
    }

    await this.orderRepository.delete(order);

    return right({});
  }
}

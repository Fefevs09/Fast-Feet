import { Order } from '@/domain/delivery/enterprise/entities/order';
import { OrderRepository } from '../repositories/order-repository';
import { Either, right } from '@/core/either';

interface FetchRecentOrdersUseCaseRequest {
  page: number;
}

type FetchRecentOrdersUseCaseResponse = Either<
  null,
  {
    orders: Order[];
  }
>;

export class FetchRecentOrdersUseCase {
  constructor(private ordersRepository: OrderRepository) {}

  async execute({
    page,
  }: FetchRecentOrdersUseCaseRequest): Promise<FetchRecentOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.findManyRecent({ page });

    return right({
      orders,
    });
  }
}

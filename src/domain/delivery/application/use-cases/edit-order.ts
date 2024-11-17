// Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada)
// Provalmente Status Order vai ser um domain event
import { OrderRepository } from '../repositories/order-repository';
import { Status } from '../../enterprise/entities/status';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { Order } from '../../enterprise/entities/order';

interface EditOrderUseCaseRequest {
  orderId: string;
  status: Status;
  orderImageUrl?: string | undefined;
}

type EditOrderUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    order: Order;
  }
>;

export class EditOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    orderId,
    status,
  }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      return left(new ResourceNotFoundError());
    }

    order.status = status;

    await this.orderRepository.save(order);

    return right({
      order,
    });
  }
}

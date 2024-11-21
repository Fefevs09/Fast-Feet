import { OrderRepository } from '../repositories/order-repository';
import { Order } from '../../enterprise/entities/order';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@/core/either';
import { OrderAttachment } from '../../enterprise/entities/order-attachment';
import { OrderAttachmentList } from '../../enterprise/entities/order-attachment-list';

interface CreateOrderUseCaseRequest {
  recipientId: string;
  address: string;
  attachmentsIds: string[];
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
    attachmentsIds,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      recipientId: new UniqueEntityID(recipientId),
      address,
    });

    const orderAttachments = attachmentsIds.map((attachmentId) => {
      return OrderAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        orderId: order.id,
      });
    });

    order.attachments = new OrderAttachmentList(orderAttachments);

    await this.orderRepository.create(order);

    return right({
      order,
    });
  }
}

// Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada)
// Provalmente Status Order vai ser um domain event
import { OrderRepository } from '../repositories/order-repository';
import { Status } from '../../enterprise/entities/value-objects/status';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { Order } from '../../enterprise/entities/order';
import { OrderAttachmentsRepository } from '../repositories/order-attachments-repository';
import { OrderAttachmentList } from '../../enterprise/entities/order-attachment-list';
import { OrderAttachment } from '../../enterprise/entities/order-attachment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface EditOrderUseCaseRequest {
  orderId: string;
  status: Status;
  attachmentsIds: string[];
}

type EditOrderUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    order: Order;
  }
>;

export class EditOrderUseCase {
  constructor(
    private orderAttachmentsRepository: OrderAttachmentsRepository,
    private orderRepository: OrderRepository,
  ) {}

  async execute({
    orderId,
    status,
    attachmentsIds,
  }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      return left(new ResourceNotFoundError());
    }

    const currentOrderAttachments =
      await this.orderAttachmentsRepository.findManyByOrderId(orderId);

    const orderAttachmentList = new OrderAttachmentList(
      currentOrderAttachments,
    );

    const orderAttachments = attachmentsIds.map((attachmentId) => {
      return OrderAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        orderId: order.id,
      });
    });

    orderAttachmentList.update(orderAttachments);

    order.attachments = orderAttachmentList;
    order.status = status;

    await this.orderRepository.save(order);

    return right({
      order,
    });
  }
}

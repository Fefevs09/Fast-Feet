import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { makeOrdersAttachments } from 'test/factories/make-order-attachments';
import { makeOrders } from 'test/factories/make-orders';
import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository';
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository';
import { Status } from '../../enterprise/entities/value-objects/status';
import { EditOrderUseCase } from './edit-order';

let inMemoryOrderRepository: InMemoryOrderRepository;
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository;
let sut: EditOrderUseCase;

beforeEach(() => {
  inMemoryOrderRepository = new InMemoryOrderRepository();
  inMemoryOrderAttachmentsRepository = new InMemoryOrderAttachmentsRepository();
  sut = new EditOrderUseCase(
    inMemoryOrderAttachmentsRepository,
    inMemoryOrderRepository,
  );
});

describe('Edit Order ', () => {
  it('should be able to edit a order', async () => {
    const newOrder = makeOrders(
      {
        recipientId: new UniqueEntityID('recipient-1'),
      },
      new UniqueEntityID('order-1'),
    );

    await inMemoryOrderRepository.create(newOrder);

    inMemoryOrderAttachmentsRepository.items.push(
      makeOrdersAttachments({
        orderId: newOrder.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeOrdersAttachments({
        orderId: newOrder.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    );

    const result = await sut.execute({
      orderId: newOrder.id.toValue(),
      status: Status.DELIVERED,
      attachmentsIds: ['1', '3'],
    });

    expect(inMemoryOrderRepository.items[0]).toMatchObject({
      status: Status.DELIVERED,
      address: newOrder.address,
    });

    expect(result.isRight()).toBe(true);
    expect(result.isRight()).toBe(true);
    expect(inMemoryOrderRepository.items[0]).toBeTruthy();
    expect(inMemoryOrderAttachmentsRepository.items).toHaveLength(2);
    expect(inMemoryOrderRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ]);
  });

  it('should not be able to edit a order that does not exist', async () => {
    const result = await sut.execute({
      orderId: new UniqueEntityID('order-1').toValue(),
      status: Status.DELIVERED,
      attachmentsIds: [],
    });

    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
    expect(result.isLeft()).toBe(true);
  });
});

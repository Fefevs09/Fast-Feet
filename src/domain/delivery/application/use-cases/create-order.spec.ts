import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository';
import { CreateOrderUseCase } from './create-order';
import { makeOrders } from 'test/factories/make-orders';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository';

let inMemoryOrderRepository: InMemoryOrderRepository;
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository;
let sut: CreateOrderUseCase;

describe('Create order repository', async () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository();
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
    );
    sut = new CreateOrderUseCase(inMemoryOrderRepository);
  });

  it('should be return a order entity', async () => {
    const newOrder = makeOrders();

    const result = await sut.execute({
      address: newOrder.address,
      recipientId: newOrder.recipientId.toString(),
      attachmentsIds: ['1', '2'],
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.order.recipientId).toBeTruthy();
    expect(inMemoryOrderRepository.items[0]).toBeTruthy();
    expect(
      inMemoryOrderRepository.items[0].attachments.currentItems,
    ).toHaveLength(2);
    expect(inMemoryOrderRepository.items[0]).toEqual(result.value?.order);
    expect(inMemoryOrderRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ]);
  });
});

import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository';
import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository';
import { DeleteOrderUseCase } from './delete-order';
import { makeOrders } from 'test/factories/make-orders';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryOrderRepository: InMemoryOrderRepository;
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository;
let sut: DeleteOrderUseCase;

describe('Delete Order', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository();
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
    );
    sut = new DeleteOrderUseCase(inMemoryOrderRepository);
  });

  it('should be able to delete a order', async () => {
    const newOrder = makeOrders(
      {
        recipientId: new UniqueEntityID('recipient-1'),
      },
      new UniqueEntityID('order-1'),
    );

    await inMemoryOrderRepository.create(newOrder);

    const result = await sut.execute({
      orderId: newOrder.id.toValue(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryOrderRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a non existing order', async () => {
    const result = await sut.execute({
      orderId: 'non-existing-id',
    });

    expect(result.isLeft()).toBe(true);
  });
});

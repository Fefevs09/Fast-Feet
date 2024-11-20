import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository';
import { EditOrderUseCase } from './edit-order';
import { makeOrders } from 'test/factories/make-orders';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Status } from '../../enterprise/entities/value-objects/status';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: EditOrderUseCase;

beforeEach(() => {
  inMemoryOrderRepository = new InMemoryOrderRepository();
  sut = new EditOrderUseCase(inMemoryOrderRepository);
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

    const result = await sut.execute({
      orderId: newOrder.id.toValue(),
      status: Status.DELIVERED,
    });

    expect(inMemoryOrderRepository.items[0]).toMatchObject({
      status: Status.DELIVERED,
      address: newOrder.address,
    });

    expect(result.isRight()).toBe(true);
  });

  it('should not be able to edit a order that does not exist', async () => {
    const result = await sut.execute({
      orderId: new UniqueEntityID('order-1').toValue(),
      status: Status.DELIVERED,
    });

    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
    expect(result.isLeft()).toBe(true);
  });
});

import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository';
import { CreateOrderUseCase } from './create-order';
import { makeOrders } from 'test/factories/make-orders';

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: CreateOrderUseCase;

describe('Create order repository', async () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
    sut = new CreateOrderUseCase(inMemoryOrderRepository);
  });

  it('should be return a order entity', async () => {
    const newOrder = makeOrders();

    const result = await sut.execute({
      address: newOrder.address,
      recipientId: newOrder.recipientId.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.order.recipientId).toBeTruthy();
    expect(inMemoryOrderRepository.items[0]).toBeTruthy();
    expect(inMemoryOrderRepository.items[0]).toEqual(result.value?.order);
    expect(inMemoryOrderRepository.items.length).toBe(1);
  });
});

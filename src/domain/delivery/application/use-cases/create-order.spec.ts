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

    const { order } = await sut.execute({
      address: newOrder.address,
      recipientId: newOrder.recipientId.toString(),
    });

    expect(order.id).toBeTruthy();
    expect(order.recipientId).toBeTruthy();
    expect(order.address).toEqual(newOrder.address);
    expect(inMemoryOrderRepository.items[0]).toBeTruthy();
    expect(inMemoryOrderRepository.items.length).toBe(1);
  });
});

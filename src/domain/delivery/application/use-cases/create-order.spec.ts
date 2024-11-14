import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository';
import { CreateOrderUseCase } from './create-order';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Order, OrderProps } from '../../enterprise/entities/order';

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: CreateOrderUseCase;

describe('Create order repository', async () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
    sut = new CreateOrderUseCase(inMemoryOrderRepository);
  });

  it('should be return a order entity', async () => {
    const fakeData = {
      recipientId: '1',
      address: 'rua do bobo',
    };
    const { order } = await sut.execute({
      address: fakeData.address,
      recipientId: fakeData.recipientId,
    });
    expect(order.id).toBeTruthy();

    expect(order.recipientId).toBeTruthy();
    expect(order.address).toEqual(fakeData.address);
  });
});

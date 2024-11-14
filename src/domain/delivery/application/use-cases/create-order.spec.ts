/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository';
import { Order } from '../../enterprise/entities/order';
import { OrderRepository } from '../repositories/order-repository';
import { CreateOrderUseCase } from './create-order';

let inMemoryOrderRepository: InMemoryOrderRepository;

describe('Create order repository', async () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
  });

  const sut = new CreateOrderUseCase(inMemoryOrderRepository);

  const fakeData = {
    recipientId: 'f3fc91ea-bd8a-4682-9a51-48a857841eeb',
    address: 'Rua tal da avenida tal',
  };

  const { order } = await sut.execute({
    recipientId: fakeData.recipientId,
    address: fakeData.address,
  });

  it('should be return a order entity', () => {
    expect(order.id).toBeTruthy();

    expect(order.recipientId).toEqual(fakeData.recipientId);
    expect(order.address).toEqual(fakeData.address);
  });
});

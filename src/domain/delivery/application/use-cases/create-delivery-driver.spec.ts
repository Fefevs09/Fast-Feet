import { CreateDeliveryDriverUseCase } from './create-delivery-driver';
import { InMemoryDeliveryDriverRepository } from 'test/repositories/in-memory-delivery-driver-repository';

let inMemoryDeliveryDriverRepository: InMemoryDeliveryDriverRepository;
let sut: CreateDeliveryDriverUseCase;

beforeEach(() => {
  inMemoryDeliveryDriverRepository = new InMemoryDeliveryDriverRepository();
  sut = new CreateDeliveryDriverUseCase(inMemoryDeliveryDriverRepository);
});

describe('Use case Delivery Driver', () => {
  const fakeData = {
    name: 'Jon Doe',
    password: '12345678',
    cpf: '123.145.500-34',
  };

  it('create a delivery driver', async () => {
    const result = await sut.execute({
      cpf: fakeData.cpf,
      password: fakeData.password,
      name: fakeData.name,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryDriverRepository.items[0]).toEqual(
      result.value?.deliveryDriver,
    );
  });
});

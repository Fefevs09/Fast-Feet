import { InMemoryDeliveryDriverRepository } from 'test/repositories/in-memory-delivery-driver-repository';
import { EditDeliveryDriverUseCase } from './edit-delivery-driver';
import { makeDeliveryDrivers } from 'test/factories/make-delivery-driver';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CPF } from '../../enterprise/entities/value-objects/cpf';

let inMemoryDeliveryDriverRepository: InMemoryDeliveryDriverRepository;
let sut: EditDeliveryDriverUseCase;

beforeEach(() => {
  inMemoryDeliveryDriverRepository = new InMemoryDeliveryDriverRepository();
  sut = new EditDeliveryDriverUseCase(inMemoryDeliveryDriverRepository);
});

describe('Edit Delivery Driver', () => {
  it('should be able to edit a delivery driver', async () => {
    const newDeliveryDriver = makeDeliveryDrivers(
      {
        name: 'John Doe',
        cpf: new CPF('123.456.789-00'),
      },
      new UniqueEntityID('driver-1'),
    );

    await inMemoryDeliveryDriverRepository.create(newDeliveryDriver);

    const result = await sut.execute({
      deliveryDriverId: newDeliveryDriver.id.toValue(),
      name: 'Jane Doe',
      password: newDeliveryDriver.password,
      currentLocation: newDeliveryDriver.currentLocation,
    });

    expect(inMemoryDeliveryDriverRepository.items[0]).toMatchObject({
      name: 'Jane Doe',
      cpf: new CPF('123.456.789-00'),
    });

    expect(result.isRight()).toBe(true);
  });

  it('should not be able to edit a non-existing delivery driver', async () => {
    const result = await sut.execute({
      deliveryDriverId: 'non-existing-id',
      name: 'Jane Doe',
      password: '123445566',
      currentLocation: '',
    });

    expect(result.isLeft()).toBe(true);
  });
});

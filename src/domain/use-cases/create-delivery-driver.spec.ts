import { CPF } from '../entities/value-objects/cpf';
import { DeliveryDriverRepository } from '../repositories/delivery-driver';
import { CreateDeliveryDriverUseCase } from './create-delivery-driver';

const fakeDeliveryDriverRepository: DeliveryDriverRepository = {
  create: async () => {
    return;
  },
};
test('create a delivery driver', async () => {
  const deliveryDriver = new CreateDeliveryDriverUseCase(
    fakeDeliveryDriverRepository,
  );

  const newDeliveryDriver = await deliveryDriver.execute({
    name: 'Jon Doe',
    password: '12345678',
    cpf: CPF.createFromText('123145050'),
  });

  expect(newDeliveryDriver.cpf).toEqual('123145050');
});

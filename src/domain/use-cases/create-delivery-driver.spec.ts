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
    cpf: '12345678',
  });

  expect(newDeliveryDriver.cpf).toEqual('12345678');
});

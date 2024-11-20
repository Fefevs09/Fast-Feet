import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  DeliveryDriver,
  DeliveryDriverProps,
} from '@/domain/delivery/enterprise/entities/delivery-driver';
import { CPF } from '@/domain/delivery/enterprise/entities/value-objects/cpf';

export function makeDeliveryDrivers(
  override: Partial<DeliveryDriverProps> = {},
  orderId?: UniqueEntityID,
) {
  const orders = DeliveryDriver.create(
    {
      name: faker.person.fullName(),
      password: faker.internet.password(),
      currentLocation: faker.location.city(),
      createdAt: new Date(),
      cpf: CPF.createFromText(
        faker.number.int({ min: 90000000, max: 99999999 }).toString(),
      ),
      ...override,
    },
    orderId,
  );

  return orders;
}

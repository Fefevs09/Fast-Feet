import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Order, OrderProps } from '@/domain/delivery/enterprise/entities/order';

export function makeOrders(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID,
) {
  const orders = Order.create(
    {
      address: faker.location.city(),
      recipientId: new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return orders;
}
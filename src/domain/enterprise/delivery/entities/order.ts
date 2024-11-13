import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Status } from './status';
import { Entity } from '@/core/entities/entity';
import { Optional } from '@prisma/client/runtime/library';

export interface OrderProps {
  recipient: string;
  address: string;
  status: Status;
  postDate: Date;
  pickupDate?: Date;
  deliveryDate?: Date | null;
  orderImageUrl: string;
}

export class Order extends Entity<OrderProps> {
  static create(props: Optional<OrderProps, 'postDate'>, id?: UniqueEntityID) {
    const order = new Order(
      {
        ...props,
        postDate: new Date(),
      },
      id,
    );

    return order;
  }
}

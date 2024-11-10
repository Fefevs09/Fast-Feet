import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Status } from './status';
import { Entity } from '@/core/entities/entity';

export interface OrderProps {
  recipient: string;
  address: string;
  status: Status;
  postDate: Date;
  pickupDate: Date;
  deliveryDate: Date;
}

export class Order extends Entity<OrderProps> {
  constructor(props: OrderProps, id?: UniqueEntityID) {
    super(props, id);
  }
}

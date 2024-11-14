import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Status } from './status';
import { Entity } from '@/core/entities/entity';
import { Optional } from '@/core/types/optional';

// probably insert DeliveryDriverID to
export interface OrderProps {
  recipientId: UniqueEntityID;
  address: string;
  status: Status;
  postDate: Date;
  pickupDate?: Date | null;
  deliveryDate?: Date | null;
  orderImageUrl?: string | null;
}

export class Order extends Entity<OrderProps> {
  get recipientId() {
    return this.props.recipientId;
  }
  get address() {
    return this.props.address;
  }
  get status() {
    return this.props.status;
  }
  get postDate() {
    return this.props.postDate;
  }
  get pickupDate() {
    return this.props.pickupDate;
  }
  get deliveryDate() {
    return this.props.deliveryDate;
  }
  get orderImageUrl() {
    return this.props.orderImageUrl;
  }

  static create(
    props: Optional<OrderProps, 'postDate' | 'status'>,
    id?: UniqueEntityID,
  ) {
    const order = new Order(
      {
        ...props,
        status: Status.WAITING,
        postDate: new Date(),
      },
      id,
    );

    return order;
  }
}

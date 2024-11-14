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
  get recipientId(): UniqueEntityID {
    return this.recipientId;
  }
  get address(): string {
    return this.address;
  }
  get status(): Status {
    return this.status;
  }
  get postDate(): Status {
    return this.postDate;
  }
  get pickupDate(): Date {
    return this.pickupDate;
  }
  get deliveryDate(): Date {
    return this.deliveryDate;
  }
  get orderImageUrl(): string {
    return this.orderImageUrl;
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

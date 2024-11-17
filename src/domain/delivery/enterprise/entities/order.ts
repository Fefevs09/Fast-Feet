import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Status } from './value-objects/status';
import { Optional } from '@/core/types/optional';
import { AggregateRoot } from '@/core/entities/aggregate-root';

export interface OrderProps {
  recipientId: UniqueEntityID;
  deliveryDriverId?: UniqueEntityID;
  address: string;
  status: Status;
  postDate: Date;
  updatedAt?: Date;
  pickupDate?: Date;
  deliveryDate?: Date;
  orderImageUrl?: string;
}

export class Order extends AggregateRoot<OrderProps> {
  get recipientId(): UniqueEntityID {
    return this.props.recipientId;
  }

  get deliveryDriverId(): UniqueEntityID | undefined {
    return this.props.deliveryDriverId;
  }

  get address(): string {
    return this.props.address;
  }

  get status(): Status {
    return this.props.status;
  }

  get postDate(): Date {
    return this.props.postDate;
  }

  get pickupDate(): Date | undefined {
    return this.props.pickupDate;
  }

  get deliveryDate(): Date | undefined {
    return this.props.deliveryDate;
  }

  get orderImageUrl(): string | undefined {
    return this.props.orderImageUrl;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set status(status: Status) {
    this.props.status = status;
    this.udpateStatus();
  }

  private udpateStatus() {
    // apply other status
    switch (this.status) {
      case Status.WAITING:
        this.props.postDate = new Date();
        this.touch();
        break;

      case Status.DELIVERED:
        this.props.deliveryDate = new Date();
        this.touch();
        break;

      case Status.PICKED_UP:
        this.props.pickupDate = new Date();
        this.touch();
        break;
      default:
        break;
    }
  }

  static create(
    props: Optional<OrderProps, 'postDate' | 'status'>,
    id?: UniqueEntityID,
  ) {
    const order = new Order(
      {
        ...props,
        status: props.status ?? Status.WAITING,
        postDate: props.postDate ?? new Date(),
      },
      id,
    );

    return order;
  }
}

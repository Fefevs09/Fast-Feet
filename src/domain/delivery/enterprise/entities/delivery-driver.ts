import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CPF } from './value-objects/cpf';
import { Entity } from '@/core/entities/entity';
import { Optional } from '@/core/types/optional';

export interface DeliveryDriverProps {
  name: string;
  cpf: CPF;
  password: string;
  currentLocation: string; // type string for now

  createdAt: Date;
  updatedAt?: Date | null;
}

export class DeliveryDriver extends Entity<DeliveryDriverProps> {
  get name() {
    return this.props.name;
  }
  get cpf() {
    return this.props.cpf;
  }
  get password() {
    return this.props.password;
  }

  get currentLocation() {
    return this.props.currentLocation;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  set password(password: string) {
    this.props.password = password;
  }

  set currentLocation(currentLocation: string) {
    this.props.currentLocation = currentLocation;
  }

  static create(
    props: Optional<DeliveryDriverProps, 'createdAt' | 'currentLocation'>,
    id?: UniqueEntityID,
  ) {
    const deliveryDrive = new DeliveryDriver(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        currentLocation: props.currentLocation ?? '',
      },
      id,
    );

    return deliveryDrive;
  }
}

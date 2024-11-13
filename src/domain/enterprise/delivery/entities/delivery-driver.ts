import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CPF } from './value-objects/cpf';
import { Entity } from '@/core/entities/entity';
import { Optional } from '@/core/types/optional';

export interface DeliveryDriverProps {
  name: string;
  cpf: CPF;
  password: string;
  currentLocation?: string; // type string for now

  createdAt: Date;
  updatedAt?: Date;
}

export class DeliveryDriver extends Entity<DeliveryDriverProps> {
  get name() {
    return this.name;
  }
  get cpf() {
    return this.cpf;
  }
  get password() {
    return this.password;
  }

  static create(
    props: Optional<DeliveryDriverProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const deliveryDrive = new DeliveryDriver(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return deliveryDrive;
  }
}

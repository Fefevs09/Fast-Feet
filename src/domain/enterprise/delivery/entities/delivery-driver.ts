import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CPF } from './value-objects/cpf';
import { Entity } from '@/core/entities/entity';

export interface DeliveryDriverProps {
  name: string;
  cpf: CPF; // Actually is cool have a CPF class
  password: string;
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

  static create(props: DeliveryDriverProps, id?: UniqueEntityID) {
    const deliveryDrive = new DeliveryDriver(props, id);

    return deliveryDrive;
  }
}

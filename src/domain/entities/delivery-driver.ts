import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CPF } from './value-objects/cpf';
import { Entity } from '@/core/entities/entity';

export interface DeliveryDriverProps {
  name: string;
  cpf: CPF; // Actually is cool have a CPF class
  password: string;
}

export class DeliveryDriver extends Entity<DeliveryDriverProps> {
  constructor(props: DeliveryDriverProps, id?: UniqueEntityID) {
    super(props, id);
  }
}

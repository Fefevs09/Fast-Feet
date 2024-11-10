import { DeliveryDriver } from '../entities/delivery-driver';
import { CPF } from '../entities/value-objects/cpf';
import { DeliveryDriverRepository } from '../repositories/delivery-driver';

interface CreateDeliveryDriverUseCaseRequest {
  name: string;
  cpf: CPF;
  password: string;
}

export class CreateDeliveryDriverUseCase {
  constructor(private deliveryDriverRepository: DeliveryDriverRepository) {}
  async execute({ cpf, name, password }: CreateDeliveryDriverUseCaseRequest) {
    const deliveryDriver = new DeliveryDriver({ name, cpf, password });

    await this.deliveryDriverRepository.create(deliveryDriver);
    return deliveryDriver;
  }
}

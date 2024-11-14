import { Injectable } from '@nestjs/common';
import { DeliveryDriver } from '@/domain/delivery/enterprise/entities/delivery-driver';
import { CPF } from '@/domain/delivery/enterprise/entities/value-objects/cpf';
import { DeliveryDriverRepository } from '../repositories/delivery-driver';

interface CreateDeliveryDriverUseCaseRequest {
  name: string;
  cpf: CPF;
  password: string;
}

@Injectable()
export class CreateDeliveryDriverUseCase {
  constructor(private deliveryDriverRepository: DeliveryDriverRepository) {}

  async execute({
    cpf,
    name,
    password,
  }: CreateDeliveryDriverUseCaseRequest): Promise<{
    name: string;
    cpf: CPF;
    password: string;
  }> {
    const deliveryDriver = DeliveryDriver.create({
      cpf,
      name,
      password,
    });

    await this.deliveryDriverRepository.create(deliveryDriver);
    return deliveryDriver;
  }
}

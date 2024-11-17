import { Injectable } from "@nestjs/common";
import { DeliveryDriver } from "@/domain/delivery/enterprise/entities/delivery-driver";
import { CPF } from "@/domain/delivery/enterprise/entities/value-objects/cpf";
import { DeliveryDriverRepository } from "../repositories/delivery-driver-repository";
import { Either, right } from "@/core/either";

interface CreateDeliveryDriverUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
}

export type CreateDeliveryDriverUseCaseResponse = Either<
  null,
  {
    deliveryDriver: DeliveryDriver;
  }
>;

@Injectable()
export class CreateDeliveryDriverUseCase {
  constructor(private deliveryDriverRepository: DeliveryDriverRepository) {}

  async execute({
    cpf,
    name,
    password,
  }: CreateDeliveryDriverUseCaseRequest): Promise<CreateDeliveryDriverUseCaseResponse> {
    const deliveryDriver = DeliveryDriver.create({
      cpf: CPF.createFromText(cpf),
      name,
      password,
    });

    await this.deliveryDriverRepository.create(deliveryDriver);

    return right({
      deliveryDriver,
    });
  }
}

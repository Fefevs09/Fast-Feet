import { DeliveryDriverRepository } from '../repositories/delivery-driver-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { DeliveryDriver } from '../../enterprise/entities/delivery-driver';

interface EditDeliveryDriverUseCaseRequest {
  deliveryDriverId: string;
  name: string;
  password: string;
  currentLocation: string;
}

type EditDeliveryDriverUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    deliveryDriver: DeliveryDriver;
  }
>;

export class EditDeliveryDriverUseCase {
  constructor(private deliveryDriverRepository: DeliveryDriverRepository) {}

  async execute({
    deliveryDriverId,
    name,
    password,
    currentLocation,
  }: EditDeliveryDriverUseCaseRequest): Promise<EditDeliveryDriverUseCaseResponse> {
    const deliveryDriver =
      await this.deliveryDriverRepository.findById(deliveryDriverId);

    if (!deliveryDriver) {
      return left(new ResourceNotFoundError());
    }

    deliveryDriver.name = name;
    deliveryDriver.password = password;
    deliveryDriver.currentLocation = currentLocation;

    return right({
      deliveryDriver,
    });
  }
}

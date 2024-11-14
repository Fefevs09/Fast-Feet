import { DeliveryDriver } from '../../enterprise/entities/delivery-driver';

export abstract class DeliveryDriverRepository {
  abstract create(deliveryDriver: DeliveryDriver): Promise<void>;
  abstract findById(id: string): Promise<DeliveryDriver | null>;
  abstract save(order: DeliveryDriver): Promise<void>;
  abstract delete(order: DeliveryDriver): Promise<void>;
}

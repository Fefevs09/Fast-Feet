import { DeliveryDriver } from '../entities/delivery-driver';

export interface DeliveryDriverRepository {
  create(deliveryDriver: DeliveryDriver): Promise<void>;
}

import { DeliveryDriver } from '../../enterprise/entities/delivery-driver';

export interface DeliveryDriverRepository {
  create(deliveryDriver: DeliveryDriver): Promise<void>;
}

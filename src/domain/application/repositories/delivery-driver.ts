import { DeliveryDriver } from '../../enterprise/delivery/entities/delivery-driver';

export interface DeliveryDriverRepository {
  create(deliveryDriver: DeliveryDriver): Promise<void>;
}

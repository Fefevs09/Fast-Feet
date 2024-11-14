import { DeliveryDriverRepository } from '@/domain/delivery/application/repositories/delivery-driver-repository';
import { DeliveryDriver } from '@/domain/delivery/enterprise/entities/delivery-driver';

export class InMemoryDeliveryDriverRepository
  implements DeliveryDriverRepository
{
  public items: DeliveryDriver[] = [];

  async create(deliveryDriver: DeliveryDriver): Promise<void> {
    this.items.push(deliveryDriver);
  }
  async findById(id: string): Promise<DeliveryDriver | null> {
    const deliverydriver = this.items.find((item) => item.id.toString() === id);
    if (!deliverydriver) return null;

    return deliverydriver;
  }

  async save(deliverydriver: DeliveryDriver): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === deliverydriver.id,
    );
    this.items[itemIndex] = deliverydriver;
  }

  async delete(deliverydriver: DeliveryDriver): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === deliverydriver.id,
    );

    this.items.splice(itemIndex, 1);
  }
}

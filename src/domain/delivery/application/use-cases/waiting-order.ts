// Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada)
export interface WaitingOrderUseCaseRequest {
  orderId: string;
}

export class WaitingOrderUseCase {
  execute({ orderId }: WaitingOrderUseCaseRequest): void {
    if (!orderId) {
      throw new Error("order don't exist");
    }
  }
}

new WaitingOrderUseCase();

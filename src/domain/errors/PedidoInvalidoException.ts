import { BaseDomainException } from "./BaseDomainException";

export class PedidoInvalidoException extends BaseDomainException {
  constructor(message: string) {
    super(`Pedido inválido: ${message}`);
  }
}

import { BaseDomainException } from "./BaseDomainException";

export class PedidoNaoEncontradoException extends BaseDomainException {
  constructor(id: string) {
    super(`Pedido com id ${id} não encontrado.`);
    this.name = "PedidoNaoEncontradoException";
  }
}
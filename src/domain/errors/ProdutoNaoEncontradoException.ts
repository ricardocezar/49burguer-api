import { BaseDomainException } from "./BaseDomainException";

export class ProdutoNaoEncontradoException extends BaseDomainException {
  constructor(id: number) {
    super(`Produto com ID ${id} não encontrado.`);
    this.name = "ProdutoNaoEncontradoException";
  }
}

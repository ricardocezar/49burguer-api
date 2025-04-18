import { BaseDomainException } from "./BaseDomainException";

export class ProdutoNaoEncontrado extends BaseDomainException {
  constructor(id: string) {
    super(`Produto com ID ${id} não encontrado.`);
  }
}

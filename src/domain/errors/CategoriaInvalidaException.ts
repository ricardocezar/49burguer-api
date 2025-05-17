import { BaseDomainException } from "./BaseDomainException";

export class CategoriaInvalidaException extends BaseDomainException {
  constructor(categoria: string, valoresValidos: string[]) {
    super(`Categoria ${categoria} inválida. Valores válidos: ${valoresValidos.join(", ")}`);
    this.name = "CategoriaInvalidaException";
  }
}
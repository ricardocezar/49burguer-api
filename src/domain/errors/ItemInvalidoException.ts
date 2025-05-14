import { BaseDomainException } from "./BaseDomainException";

export class ItemInvalidoException extends BaseDomainException {
  constructor(message: string) {
    super(`Item inválido: ${message}`);
  }
}

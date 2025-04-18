import { BaseDomainException } from "./BaseDomainException";

export class PrecoInvalidoException extends BaseDomainException {
  constructor(mensagem: string) {
    super(mensagem);
  }
}
import { BaseDomainException } from "./BaseDomainException";

export class CpfInvalidoException extends BaseDomainException {
  constructor(cpf: string) {
    super(`CPF ${cpf} inválido.`);
  }
}

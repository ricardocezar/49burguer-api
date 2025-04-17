import { BaseDomainException } from "./BaseDomainException";

export class ClienteJaCadastradoException extends BaseDomainException {
  constructor(cpf: string) {
    super(`Cliente com CPF ${cpf} já cadastrado.`);
  }
}

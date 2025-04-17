import { BaseDomainException } from './BaseDomainException';

export class ClienteNaoEncontradoException extends BaseDomainException {
  constructor(cpf: string) {
    super(`Cliente com CPF ${cpf} não encontrado.`);
    this.name = 'ClienteNaoEncontradoException';
  }
}

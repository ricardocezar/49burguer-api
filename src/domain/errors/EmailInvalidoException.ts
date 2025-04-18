import { BaseDomainException } from './BaseDomainException';

export class EmailInvalidoException extends BaseDomainException {
  constructor(email: string) {
    super(`Email ${email} inválido.`);
  }
}
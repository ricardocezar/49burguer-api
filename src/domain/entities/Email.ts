import { EmailInvalidoException } from "../errors/EmailInvalidoException";

export class Email {
  constructor(private readonly email: string) {
    this.validarEmail();
  }

  private validarEmail(): void {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(this.email)) {
      throw new EmailInvalidoException(this.email);
    }
  }

  public get endereco(): string {
    return this.email;
  }
}
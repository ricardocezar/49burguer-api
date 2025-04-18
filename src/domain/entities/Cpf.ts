import { CpfInvalidoException } from "../errors/CpfInvalidoException";

export class Cpf {
  private cpfNumber: string;
  constructor(cpfNumber: string) {
    this.validate(cpfNumber);
    this.cpfNumber = cpfNumber;
  }

  public get numero(): string {
    return this.cpfNumber;
  }

  private validate(cpfNumber: string): void {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpfNumber)) {
      throw new CpfInvalidoException(cpfNumber);
    }
  }
}

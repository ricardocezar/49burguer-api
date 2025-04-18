import { Cpf } from "./Cpf";
import { Email } from "./Email";

export class Cliente {
  private nome: string;
  private cpf: Cpf;
  private email: Email;

  constructor(
    { nome, cpf, email }:
    {nome: string,
    cpf: string,
    email: string}
  ) {
    this.nome = nome;
    this.cpf = new Cpf(cpf);
    this.email = new Email(email);
  }
  
    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getCpf(): string {
        return this.cpf.numero;
    }

    public setCpf(cpf: string): void {
        this.cpf = new Cpf(cpf);
    }

    public getEmail(): string {
        return this.email.endereco;
    }

    public setEmail(email: string): void {
        this.email = new Email(email);
    }

    toJSON() {
      return { nome: this.nome, cpf: this.cpf.numero, email: this.email };
    }
}

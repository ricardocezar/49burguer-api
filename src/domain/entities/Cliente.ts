import { Cpf } from "./Cpf";

export class Cliente {
  private nome: string;
  private cpf: Cpf;

  constructor(
    { nome, cpf }:
    {nome: string,
    cpf: string,
    id?: number}
  ) {
    this.nome = nome;
    this.cpf = new Cpf(cpf);
  }
  
    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getCpf(): string {
        return this.cpf.getValue();
    }

    public setCpf(cpf: string): void {
        this.cpf = new Cpf(cpf);
    }

    toJSON() {
      return { nome: this.nome, cpf: this.cpf.getValue() };
    }
}

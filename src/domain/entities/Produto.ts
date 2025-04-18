import { Categoria } from "./Categoria";
import { Preco } from "./Preco";

export class Produto {
  private descricao: string;
  private preco: Preco;
  private categoria: Categoria;
  private id?: number;

  constructor(
    descricao: string,
    preco: number,
    categoria: string,
    id?: number,
  ) {
    this.descricao = descricao;
    this.preco = new Preco(preco);
    this.categoria = new Categoria(categoria);
    this.id = id;
  }

  getCategoria(): string {
    return this.categoria.descricao;
  }

  setCategoria(categoria: string): void {
    this.categoria = new Categoria(categoria);
  }

  getDescricao(): string {
    return this.descricao;
  }

  setDescricao(descricao: string): void {
    this.descricao = descricao;
  }

  getPreco(): number {
    return this.preco.valorNumerico;
  }

  getPrecoFormatado(): string {
    return this.preco.valorFormatado;
  }

  setPreco(preco: number): void {
    this.preco = new Preco(preco);
  }

  getId(): number | undefined {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  toJSON(): object {
    return {
      id: this.id,
      descricao: this.descricao,
      precoFormatado: this.preco.valorFormatado,
      preco: this.preco.valorNumerico,
      categoria: this.categoria.descricao,
    };
  }
}

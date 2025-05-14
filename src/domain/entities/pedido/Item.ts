import { ItemInvalidoException } from "@/domain/errors/ItemInvalidoException";
import { Produto } from "../produto/Produto";

export class Item {
  constructor(
    private readonly produto: Produto,
    private quantidade: number,
  ) {
    if (quantidade <= 0) {
      throw new ItemInvalidoException("A quantidade deve ser maior que zero.");
    }
    if (!produto) {
      throw new ItemInvalidoException("O produto não pode ser nulo.");
    }
  }

  public getProduto(): Produto {
    return this.produto;
  }

  public getQuantidade(): number {
    return this.quantidade;
  }

  public getValorDoItem(): number {
    return this.produto.getPreco() * this.quantidade;
  }

  public adicionarQuantidade(quantidade: number): void {
    if (quantidade <= 0) {
      throw new ItemInvalidoException("A quantidade deve ser maior que zero.");
    }
    this.quantidade += quantidade;
  }

  public removerQuantidade(quantidade: number): void {
    if (quantidade <= 0) {
      throw new ItemInvalidoException("A quantidade deve ser maior que zero.");
    }
    if (this.quantidade - quantidade < 0) {
      this.quantidade = 0;
    }
    this.quantidade -= quantidade;
  }

  public vazio(): boolean {
    return this.quantidade <= 0;
  }
}

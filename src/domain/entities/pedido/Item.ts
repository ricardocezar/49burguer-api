import { ItemInvalidoException } from "@/domain/errors/ItemInvalidoException";
import { Produto } from "../produto/Produto";

export class Item {
  private readonly valorUnitario: number;
  constructor(private readonly produto: Produto, private quantidade: number) {
    if (quantidade <= 0) {
      throw new ItemInvalidoException("A quantidade deve ser maior que zero.");
    }
    if (!produto) {
      throw new ItemInvalidoException("O produto não pode ser nulo.");
    }
    this.valorUnitario = produto.getPreco();
  }

  public getProduto(): Produto {
    return this.produto;
  }

  public getQuantidade(): number {
    return this.quantidade;
  }

  public getValorUnitario(): number {
    return this.valorUnitario;
  }

  public getValorTotalDoItem(): number {
    return this.valorUnitario * this.quantidade;
  }

  public substituirQuantidade(quantidade: number): void {
    if (quantidade <= 0) {
      throw new ItemInvalidoException("A quantidade deve ser maior que zero.");
    }
    this.quantidade = quantidade;
  }

  public vazio(): boolean {
    return this.quantidade <= 0;
  }
}

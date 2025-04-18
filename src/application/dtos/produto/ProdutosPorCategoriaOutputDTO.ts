import { ProdutoOutputDTO } from "./ProdutoOutputDTO";

export class ProdutosPorCategoriaOutputDTO {
  categoria: string;
  produtos: ProdutoOutputDTO[];
  totalProdutos: number;

  constructor(categoria: string, produtos: ProdutoOutputDTO[]) {
    this.categoria = categoria;
    this.produtos = produtos;
    this.totalProdutos = produtos.length;
  }
}
export class ProdutoOutputDTO {
  id: number;
  descricao: string;
  preco: number;
  precoFormatado: string;
  categoria: string;

  constructor(
    id: number,
    descricao: string,
    preco: number,
    precoFormatado: string,
    categoria: string
  ) {
    this.id = id;
    this.descricao = descricao;
    this.preco = preco;
    this.precoFormatado = precoFormatado;
    this.categoria = categoria;
  }
}

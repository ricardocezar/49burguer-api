export class CadastrarProdutoInputDTO {
  constructor(
    public nome: string,
    public descricao: string,
    public preco: number,
    public categoria: 'LANCHE' | 'ACOMPANHAMENTO' | 'BEBIDA' | 'SOBREMESA',
  ) {}
}
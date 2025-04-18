export class AtualizarProdutoInputDTO {
  constructor(
    public descricao?: string,
    public preco?: number,
    public categoria?: 'LANCHE' | 'ACOMPANHAMENTO' | 'BEBIDA' | 'SOBREMESA',
  ) {}
}
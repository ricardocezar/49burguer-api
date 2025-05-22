export type ProdutoInputDTO = {
  pedidoId: string | undefined | null;
  produtoId: number;
  quantidade: number;
};

export type ItemInputDTO = {
  pedidoId: string;
  itens: ProdutoInputDTO[];
};


export type ItensOutputDTO = {
  produtoId: number;
  nome: string;
  quantidade: number;
  valorUnitario: number;
}

export type ItensOutputDTOArray = {
  itens: ItensOutputDTO[];
}

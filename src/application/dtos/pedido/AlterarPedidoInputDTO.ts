export type AlterarPedidoInputDTO = {
  id: string;
  cliente?: {
    cpf?: string;
    identificarCliente: boolean;
  }
  itens?: {
    produtoId: number;
    quantidade?: number;
    remover?: boolean;
  }[];
  observacao?: string;
}

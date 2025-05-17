export type CheckoutPedidoInputDTO = {
  pedidoId: string;
  pagamento?: {
    tipo?: string;
    valor?: number;
    dataPagamento?: Date;
    status?: string;
    token?: string;
    observacao?: string;
  };
}

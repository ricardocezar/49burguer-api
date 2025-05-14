export interface PedidoEstado {
  receberPedido(): void;
  iniciarPreparacao(): void;
  finalizarPreparo(): void;
  entregarPedido(): void;
  cancelarPedido(): void;
}

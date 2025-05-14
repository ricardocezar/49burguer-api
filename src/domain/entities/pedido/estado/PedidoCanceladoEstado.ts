import { Pedido } from "../Pedido";
import { PedidoEstado } from "./PedidoEstado";

export class PedidoCanceladoEstado implements PedidoEstado {
  private readonly pedido: Pedido;

  constructor(pedido: Pedido) {
    this.pedido = pedido;
  }

  receberPedido(): void {
    throw new Error("Pedido cancelado não pode ser recebido.");
  }

  iniciarPreparacao(): void {
    throw new Error("Pedido cancelado não pode ser preparado.");
  }

  finalizarPreparo(): void {
    throw new Error("Pedido cancelado não pode ser finalizado.");
  }

  entregarPedido(): void {
    throw new Error("Pedido cancelado não pode ser entregue.");
  }

  cancelarPedido(): void {
    throw new Error("Pedido já está cancelado.");
  }
}
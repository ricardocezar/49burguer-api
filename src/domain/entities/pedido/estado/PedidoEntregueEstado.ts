import { Pedido } from "../Pedido";
import { PedidoEstado } from "./PedidoEstado";

export class PedidoEntregueEstado implements PedidoEstado {
  private readonly pedido: Pedido;

  constructor(pedido: Pedido) {
    this.pedido = pedido;
  }

  receberPedido(): void {
    throw new Error("Pedido já entregue.");
  }

  iniciarPreparacao(): void {
    throw new Error("Pedido já entregue.");
  }

  finalizarPreparo(): void {
    throw new Error("Pedido já entregue.");
  }

  entregarPedido(): void {
    throw new Error("Pedido já entregue.");
  }

  cancelarPedido(): void {
    throw new Error("Pedido já entregue.");
  }
}
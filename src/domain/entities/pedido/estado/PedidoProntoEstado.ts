import { Pedido } from "../Pedido";
import { PedidoEntregueEstado } from "./PedidoEntregueEstado";
import { PedidoEstado } from "./PedidoEstado";

export class PedidoProntoEstado implements PedidoEstado {
  private readonly pedido: Pedido;

  constructor(pedido: Pedido) {
    this.pedido = pedido;
  }

  permiteAlteracao(): boolean {
    return false;
  }

  naoPermiteAlteracao(): boolean {
    return !this.permiteAlteracao();
  }

  receberPedido(): void {
    throw new Error("Pedido já recebido.");
  }

  iniciarPreparacao(): void {
    throw new Error("Pedido já em preparação.");
  }

  finalizarPreparo(): void {
    throw new Error("Pedido já finalizado.");
  }

  entregarPedido(): void {
    this.pedido.setEstado(new PedidoEntregueEstado(this.pedido));
    console.log("Pedido entregue.");
  }

  cancelarPedido(): void {
    throw new Error("Pedido não pode ser cancelado após ser finalizado.");
  }
}
import { Pedido } from "../Pedido";
import { PedidoCanceladoEstado } from "./PedidoCanceladoEstado";
import { PedidoEstado } from "./PedidoEstado";
import { PedidoRecebidoEstado } from "./PedidoRecebidoEstado";

export class PedidoCriadoEstado implements PedidoEstado {
  private readonly pedido: Pedido;
  
  constructor(pedido: Pedido) {
    this.pedido = pedido;
  }

  receberPedido(): void {
    if (this.pedido.getItens() === undefined || this.pedido.getItens().length === 0) {
      throw new Error("Pedido não pode ser recebido sem itens.");
    }
    this.pedido.setEstado(new PedidoRecebidoEstado(this.pedido));
  }

  iniciarPreparacao(): void {
    throw new Error("Pedido não pode ser preparado antes de ser recebido.");
  }

  finalizarPreparo(): void {
    throw new Error("Pedido não pode ser finalizado antes de ser preparado.");
  }

  entregarPedido(): void {
    throw new Error("Pedido não pode ser entregue antes de ser finalizado.");
  }

  cancelarPedido(): void {
    this.pedido.setEstado(new PedidoCanceladoEstado(this.pedido));
    console.log("Pedido cancelado.");
  }
}

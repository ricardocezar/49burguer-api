import { Categoria } from "../../produto/Categoria";
import { Pedido } from "../Pedido";
import { PedidoCanceladoEstado } from "./PedidoCanceladoEstado";
import { PedidoEmPreparacaoEstado } from "./PedidoEmPreparacaoEstado";
import { PedidoEstado } from "./PedidoEstado";

export class PedidoRecebidoEstado implements PedidoEstado {
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
    this.pedido.setEstado(new PedidoEmPreparacaoEstado(this.pedido));
    console.log("Pedido preparado.");
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
import { Pedido } from '../Pedido';
import { PedidoCanceladoEstado } from './PedidoCanceladoEstado';
import { PedidoEstado } from './PedidoEstado';
import { PedidoProntoEstado } from './PedidoProntoEstado';

export class PedidoEmPreparacaoEstado implements PedidoEstado {
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
    this.pedido.setEstado(new PedidoProntoEstado(this.pedido));
    console.log("Pedido finalizado.");
  }

  entregarPedido(): void {
    throw new Error("Pedido não pode ser entregue antes de ser finalizado.");
  }

  cancelarPedido(): void {
    this.pedido.setEstado(new PedidoCanceladoEstado(this.pedido));
    console.log("Pedido cancelado.");
  }
}

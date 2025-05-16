import { Pedido } from "../Pedido";
import { StatusPedido } from "../StatusPedido";
import { PedidoCriadoEstado } from "./PedidoCriadoEstado";

export interface PedidoEstado {
  receberPedido(): void;
  iniciarPreparacao(): void;
  finalizarPreparo(): void;
  entregarPedido(): void;
  cancelarPedido(): void;
}

export function recuperarEstado(status: StatusPedido, pedido: Pedido): PedidoEstado {
  switch (status) {
    case StatusPedido.CRIADO:
      return new PedidoCriadoEstado(pedido);
    case StatusPedido.RECEBIDO:
      return new PedidoCriadoEstado(pedido);
    case StatusPedido.EM_PREPARACAO:
      return new PedidoCriadoEstado(pedido);
    case StatusPedido.FINALIZADO:
      return new PedidoCriadoEstado(pedido);
    case StatusPedido.ENTREGUE:
      return new PedidoCriadoEstado(pedido);
    case StatusPedido.CANCELADO:
      return new PedidoCriadoEstado(pedido);
    default:
      throw new Error("Status inválido");
  }
}

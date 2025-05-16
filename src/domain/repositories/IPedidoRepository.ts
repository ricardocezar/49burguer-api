import { Pedido } from "../entities/pedido/Pedido";

export interface IPedidoRepository {
  buscarPorId(id: string): Promise<Pedido | null>;
  buscarPorStatus(status: string): Promise<Pedido[]>;
  buscarPorStatusEData(
    status: string,
    dataInicio: Date,
    dataFim: Date
  ): Promise<Pedido[]>;
  salvar(pedido: Pedido): Promise<Pedido>;
  atualizar(pedido: Pedido): Promise<Pedido>;
}

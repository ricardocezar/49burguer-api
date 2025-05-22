import { Pedido } from "../entities/pedido/Pedido";

export interface IPedidoRepository {
  remover(pedido: Pedido): Promise<void>;
  buscarPorId(id: string): Promise<Pedido | null>;
  buscarPorStatus(status: string): Promise<Pedido[]>;
  buscarPorStatusEData(
    status?: string | null,
    dataInicio?: Date | null,
    dataFim?: Date | null
  ): Promise<Pedido[]>;
  salvar(pedido: Pedido): Promise<Pedido>;
  atualizar(pedido: Pedido): Promise<Pedido>;
}

import { BuscarPedidosPorStatusEDataInputDTO } from "@/application/dtos/pedido/BuscarPedidosPorStatusEDataInputDTO";
import { PedidoMapper } from "@/application/dtos/pedido/mapper/PedidoMapper";
import { PedidoOutputDTO } from "@/application/dtos/pedido/PedidoOutputDTO";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";

export class BuscarPedidosPorStatusEDataUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async execute(filtro: BuscarPedidosPorStatusEDataInputDTO)
  : Promise<PedidoOutputDTO[]> {
    const pedidos = await this.pedidoRepository.buscarPorStatusEData(
      filtro.status,
      filtro.dataInicial,
      filtro.dataFinal
    );
    if (!pedidos || pedidos.length === 0) {
      return [];
    }
    return pedidos.map((pedido) => (
      PedidoMapper.toOutputDTO(pedido)
    ));
  }
}

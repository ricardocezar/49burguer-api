import { PedidoMapper } from "@/application/dtos/pedido/mapper/PedidoMapper";
import { PedidoOutputDTO } from "@/application/dtos/pedido/PedidoOutputDTO";
import { PedidoNaoEncontradoException } from "@/domain/errors/PedidoNaoEncontradoException";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";

export class BuscarPedidoPorIdUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async execute(id: string): Promise<PedidoOutputDTO> {
    const pedido = await this.pedidoRepository.buscarPorId(id);
    if (!pedido) {
      throw new PedidoNaoEncontradoException(id);
    }
    return PedidoMapper.toOutputDTO(pedido);
  }
}

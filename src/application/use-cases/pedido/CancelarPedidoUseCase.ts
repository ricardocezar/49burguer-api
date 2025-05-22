import { PedidoMapper } from "@/application/dtos/pedido/mapper/PedidoMapper";
import { PedidoOutputDTO } from "@/application/dtos/pedido/PedidoOutputDTO";
import { PedidoNaoEncontradoException } from "@/domain/errors/PedidoNaoEncontradoException";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";

export class CancelarPedidoUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async execute(id: string): Promise<PedidoOutputDTO> {
    let pedido = await this.pedidoRepository.buscarPorId(id);
    if (!pedido) {
      throw new PedidoNaoEncontradoException(id);
    }
    pedido.cancelar();
    pedido = await this.pedidoRepository.salvar(pedido);
    return PedidoMapper.toOutputDTO(pedido);
  }
}

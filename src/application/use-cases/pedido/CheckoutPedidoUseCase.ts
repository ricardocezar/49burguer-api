import { CheckoutPedidoInputDTO } from "@/application/dtos/pedido/CheckoutPedidoInputDTO";
import { PedidoMapper } from "@/application/dtos/pedido/mapper/PedidoMapper";
import { PedidoOutputDTO } from "@/application/dtos/pedido/PedidoOutputDTO";
import { PedidoNaoEncontradoException } from "@/domain/errors/PedidoNaoEncontradoException";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";

export class CheckoutPedidoUseCase {
  constructor(private readonly pedidoRepository: IPedidoRepository) {}

  async execute(input: CheckoutPedidoInputDTO): Promise<PedidoOutputDTO> {
    const pedido = await this.pedidoRepository.buscarPorId(input.pedidoId);
    if (!pedido) {
      throw new PedidoNaoEncontradoException(input.pedidoId);
    }
    pedido.receber();
    const pedidoAtualizado = await this.pedidoRepository.atualizar(pedido);
    return PedidoMapper.toOutputDTO(pedidoAtualizado);
  }
}

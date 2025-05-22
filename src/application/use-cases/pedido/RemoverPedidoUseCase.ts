import { PedidoNaoEncontradoException } from "@/domain/errors/PedidoNaoEncontradoException";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";

export class RemoverPedidoUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async execute(id: string): Promise<void> {
    const pedido = await this.pedidoRepository.buscarPorId(id);
    if (!pedido) {
      throw new PedidoNaoEncontradoException(id);
    }
    await this.pedidoRepository.remover(pedido);
  }
}

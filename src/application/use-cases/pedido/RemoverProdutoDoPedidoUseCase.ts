import { PedidoMapper } from "@/application/dtos/pedido/mapper/PedidoMapper";
import { PedidoOutputDTO } from "@/application/dtos/pedido/PedidoOutputDTO";
import { RemoverProdutoInputDTO } from "@/application/dtos/produto/RemoverProdutoInputDTOS";
import { PedidoNaoEncontradoException } from "@/domain/errors/PedidoNaoEncontradoException";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";

export class RemoverProdutoDoPedidoUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async execute(input: RemoverProdutoInputDTO): Promise<PedidoOutputDTO> {
    const pedido = await this.pedidoRepository.buscarPorId(input.pedidoId);
    if (!pedido) {
      throw new PedidoNaoEncontradoException(input.pedidoId);
    }
    pedido.removerProduto(Number(input.produtoId));
    await this.pedidoRepository.atualizar(pedido);
    return PedidoMapper.toOutputDTO(pedido);
  }
}

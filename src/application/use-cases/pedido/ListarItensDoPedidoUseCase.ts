import { ItensOutputDTOArray } from "@/application/dtos/pedido/ItensOutputDTO";
import { PedidoNaoEncontradoException } from "@/domain/errors/PedidoNaoEncontradoException";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";

export class ListarItensDoPedidoUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async execute(id: string): Promise<ItensOutputDTOArray> {
    const pedido = await this.pedidoRepository.buscarPorId(id);
    if (!pedido) {
      throw new PedidoNaoEncontradoException(id);
    }
    if (pedido.getItens().length === 0) {
      return { itens: [] };
    }
    const itens = pedido.getItens().map((item) => ({
      produtoId: item.getProduto().getId()!,
      nome: item.getProduto().getDescricao(),
      quantidade: item.getQuantidade(),
      valorUnitario: item.getValorUnitario(),
    })) || [];
    return { itens };
  }
}

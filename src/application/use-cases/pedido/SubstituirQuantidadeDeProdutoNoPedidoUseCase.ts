import { PedidoMapper } from "@/application/dtos/pedido/mapper/PedidoMapper";
import { PedidoOutputDTO } from "@/application/dtos/pedido/PedidoOutputDTO";
import { ProdutoInputDTO } from "@/application/dtos/pedido/ProdutoInputDTO";
import { Item } from "@/domain/entities/pedido/Item";
import { ItemInvalidoException } from "@/domain/errors/ItemInvalidoException";
import { PedidoNaoEncontradoException } from "@/domain/errors/PedidoNaoEncontradoException";
import { ProdutoNaoEncontradoException } from "@/domain/errors/ProdutoNaoEncontradoException";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";
import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";

export class SubstituirQuantidadeDeProdutoNoPedidoUseCase {
  constructor(
    private pedidoRepository: IPedidoRepository,
    private produtoRepository: IProdutoRepository
  ) {}

  async execute(input: ProdutoInputDTO): Promise<PedidoOutputDTO> {
    if (!input.pedidoId) {
      throw new ItemInvalidoException("Pedido não informado");
    }
    let pedido = await this.pedidoRepository.buscarPorId(input.pedidoId);
    if (!pedido) {
      throw new PedidoNaoEncontradoException(input.pedidoId);
    }
    const produto = await this.produtoRepository.buscarPorId(input.produtoId);
    if (!produto) {
      throw new ProdutoNaoEncontradoException(input.produtoId);
    }
    pedido.substituirQuantidadeDoProduto(produto, input.quantidade);
    pedido = await this.pedidoRepository.atualizar(pedido);
    return PedidoMapper.toOutputDTO(pedido);
  }
}

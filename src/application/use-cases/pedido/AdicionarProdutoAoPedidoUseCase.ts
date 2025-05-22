import { ItemInputDTO, ProdutoInputDTO } from "@/application/dtos/pedido/ProdutoInputDTO";
import { PedidoMapper } from "@/application/dtos/pedido/mapper/PedidoMapper";
import { PedidoOutputDTO } from "@/application/dtos/pedido/PedidoOutputDTO";
import { PedidoNaoEncontradoException } from "@/domain/errors/PedidoNaoEncontradoException";
import { ProdutoNaoEncontradoException } from "@/domain/errors/ProdutoNaoEncontradoException";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";
import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";
import { ItemInvalidoException } from "@/domain/errors/ItemInvalidoException";

export class AdicionarProdutoAoPedidoUseCase {
  constructor(
    private pedidoRepository: IPedidoRepository,
    private produtoRepository: IProdutoRepository
  ) {}

  async execute(input: ItemInputDTO): Promise<PedidoOutputDTO> {
    if (!input.itens || input.itens.length === 0) {
      throw new ItemInvalidoException("Produto não informado");
    }
    let pedido = await this.pedidoRepository.buscarPorId(input.pedidoId);
    if (!pedido) {
      throw new PedidoNaoEncontradoException(input.pedidoId);
    }
    await input.itens.forEach(async (produtoInput: ProdutoInputDTO) => {
      const produto = await this.produtoRepository.buscarPorId(produtoInput.produtoId);
      if (!produto) {
        throw new ProdutoNaoEncontradoException(produtoInput.produtoId);
      }
      pedido!.adicionarProduto(produto, produtoInput.quantidade);
      console.log("adicionando produto", produto);
      console.log("pedido", pedido);
    });
    pedido = await this.pedidoRepository.atualizar(pedido);
    return PedidoMapper.toOutputDTO(pedido);
  }
}

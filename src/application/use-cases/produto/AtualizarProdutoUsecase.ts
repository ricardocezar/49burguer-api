import { AtualizarProdutoInputDTO } from "@/application/dtos/produto/AtualizarProdutoInputDTO";
import { ProdutoOutputDTO } from "@/application/dtos/produto/ProdutoOutputDTO";
import { ProdutoNaoEncontrado } from "@/domain/errors/ProdutoNaoEncontrado";
import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";

export class AtualizarProdutoUsecase {
  constructor(private produtoRepository: IProdutoRepository) {}

  async execute(id: number, input: AtualizarProdutoInputDTO): Promise<ProdutoOutputDTO> {
    let produtoEncontrado = await this.produtoRepository.buscarPorId(id);
    if (!produtoEncontrado) {
      throw new ProdutoNaoEncontrado("Produto não encontrado");
    }
    produtoEncontrado.setDescricao(input.descricao ?? produtoEncontrado.getDescricao());
    produtoEncontrado.setPreco(input.preco ?? produtoEncontrado.getPreco());
    produtoEncontrado.setCategoria(input.categoria ?? produtoEncontrado.getCategoria());
    const produtoAtualizado = await this.produtoRepository.atualizar(produtoEncontrado);
    return new ProdutoOutputDTO(
      produtoAtualizado.getId()!,
      produtoAtualizado.getDescricao(),
      produtoAtualizado.getPreco(),
      produtoAtualizado.getPrecoFormatado(),
      produtoAtualizado.getCategoria(),
    );
  }
}
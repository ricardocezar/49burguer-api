import { ProdutoNaoEncontradoException } from "@/domain/errors/ProdutoNaoEncontradoException";
import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";

export class RemoverProdutoUsecase {
  constructor(private produtoRepository: IProdutoRepository) {}

  async execute(id: number): Promise<void> {
    const produto = await this.produtoRepository.buscarPorId(id);
    if (!produto) {
      throw new ProdutoNaoEncontradoException("Produto não encontrado");
    }
    await this.produtoRepository.remover(id);
  }
}
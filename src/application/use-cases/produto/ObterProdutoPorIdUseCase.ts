import { ProdutoNaoEncontradoException } from "@/domain/errors/ProdutoNaoEncontradoException";
import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";

export class ObterProdutoPorIdUseCase {
  constructor(private readonly produtoRepository: IProdutoRepository) {}

  async execute(id: number): Promise<any> {
    const produto = await this.produtoRepository.buscarPorId(id);
    if (!produto) {
      throw new ProdutoNaoEncontradoException(id);
    }
    return produto;
  }
}

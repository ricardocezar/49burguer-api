import { ProdutosPorCategoriaOutputDTO } from "@/application/dtos/produto/ProdutosPorCategoriaOutputDTO";
import { Categoria } from "@/domain/entities/produto/Categoria";
import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";

export class ListarProdutosPorCategoriaUsecase {
  constructor(private produtoRepository: IProdutoRepository) {}

  async execute(categoria: Categoria): Promise<ProdutosPorCategoriaOutputDTO> {
    const produtos =
      (await this.produtoRepository.buscarPorCategoria(categoria)) || [];
    const produtosOutput = {
      categoria: categoria.descricao,
      produtos: produtos.map((produto) => ({
        id: produto.getId(),
        descricao: produto.getDescricao(),
        preco: produto.getPreco(),
        precoFormatado: produto.getPrecoFormatado(),
        categoria: produto.getCategoria(),
      })),
    } as ProdutosPorCategoriaOutputDTO;
    return produtosOutput;
  }
}

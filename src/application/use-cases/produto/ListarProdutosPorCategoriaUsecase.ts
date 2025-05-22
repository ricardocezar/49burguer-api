import { ProdutosPorCategoriaOutputDTO } from "@/application/dtos/produto/ProdutosPorCategoriaOutputDTO";
import { Categoria } from "@/domain/entities/produto/Categoria";
import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";

export class ListarProdutosPorCategoriaUsecase {
  constructor(private produtoRepository: IProdutoRepository) {}

  async execute(categoria: string): Promise<ProdutosPorCategoriaOutputDTO> {
    if (!categoria) {
      throw new Error("Categoria não informada.");
    }
    const categoriaEnum = new Categoria(categoria);
    if (!categoriaEnum) {
      throw new Error("Categoria inválida.");
    }
    const produtos = await this.produtoRepository.buscarPorCategoria(categoriaEnum) || [];
    const produtosOutput = {
      categoria: categoriaEnum.descricao,
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

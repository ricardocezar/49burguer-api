import { CadastrarProdutoInputDTO } from "@/application/dtos/produto/CadastrarProdutoInputDTO";
import { ProdutoOutputDTO } from "@/application/dtos/produto/ProdutoOutputDTO";
import { Produto } from "@/domain/entities/produto/Produto";
import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";

export class CadastrarProdutoUsecase {
  constructor(private readonly produtoRepository: IProdutoRepository) {}

  async execute(input: CadastrarProdutoInputDTO): Promise<ProdutoOutputDTO> {
    const produtoCadastrado = await this.produtoRepository.salvar(new Produto(
      input.descricao,
      input.preco,
      input.categoria
    )) as Produto;
    return new ProdutoOutputDTO(
      produtoCadastrado.getId() || 0,
      produtoCadastrado.getDescricao(),
      produtoCadastrado.getPreco(),
      produtoCadastrado.getPrecoFormatado(),
      produtoCadastrado.getCategoria(),
    );
  }
}

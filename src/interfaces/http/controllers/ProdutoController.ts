import { ProdutoOutputDTO } from "@/application/dtos/produto/ProdutoOutputDTO";
import { AtualizarProdutoUsecase } from "@/application/use-cases/produto/AtualizarProdutoUsecase";
import { CadastrarProdutoUsecase } from "@/application/use-cases/produto/CadastrarProdutoUsecase";
import { ListarProdutosPorCategoriaUsecase } from "@/application/use-cases/produto/ListarProdutosPorCategoriaUsecase";
import { RemoverProdutoUsecase } from "@/application/use-cases/produto/RemoverProdutoUsecase";

export class ProdutoController {
  constructor(
    private readonly cadastrarProdutoUsecase: CadastrarProdutoUsecase,
    private readonly atualizarProdutoUsecase: AtualizarProdutoUsecase,
    private readonly removerProdutoUsecase: RemoverProdutoUsecase,
    private readonly listarProdutosPorCategoriaUsecase: ListarProdutosPorCategoriaUsecase
  ) {}

  async cadastrar(req: any, res: any, next: any) {
    try {
      const input = req.body;
      const produto = await this.cadastrarProdutoUsecase.execute(input);
      return res.status(201).json(produto);
    } catch (error) {
      return next(error);
    }
  }

  async atualizar(
    req: any,
    res: any,
    next: any
  ) {
    try {
      const { id } = req.params;
      const input = req.body;
      const produtoAtualizado = await this.atualizarProdutoUsecase.execute(
        Number(id),
        input
      );
      return res.status(200).json(produtoAtualizado);
    } catch (error) {
      return next(error);
    }
  }

  async remover(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      await this.removerProdutoUsecase.execute(Number(id));
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  async listarPorCategoria(req: any, res: any, next: any) {
    try {
      const { categoria } = req.params;
      const produtos = await this.listarProdutosPorCategoriaUsecase.execute(categoria);
      return res.status(200).json(produtos);
    } catch (error) {
      return next(error);
    }
  }
}

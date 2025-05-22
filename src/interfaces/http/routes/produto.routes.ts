import { AtualizarProdutoUsecase } from "@/application/use-cases/produto/AtualizarProdutoUsecase";
import { CadastrarProdutoUsecase } from "@/application/use-cases/produto/CadastrarProdutoUsecase";
import { ListarProdutosPorCategoriaUsecase } from "@/application/use-cases/produto/ListarProdutosPorCategoriaUsecase";
import { RemoverProdutoUsecase } from "@/application/use-cases/produto/RemoverProdutoUsecase";
import { ProdutoRepository } from "@/infrastructure/database/prisma/repositories/ProdutoRepository";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";
import { validateBody, validateParams } from "../middlewares/validateRequest";
import { cadastrarProdutoSchema } from "../validators/produto/produto-cadastrar.schema";
import { paramIdNumberSchema } from "../validators/param-id-number.schema";
import { categoriaSchema } from "../validators/produto/categoria.schema";
import { produtoUseCases } from "./di-utils";

const produtoRotas = Router();

const produtoController = new ProdutoController(
  produtoUseCases.cadastrarProduto,
  produtoUseCases.atualizarProduto,
  produtoUseCases.removerProduto,
  produtoUseCases.listarProdutosPorCategoriaUseCase,
  produtoUseCases.obterProdutoPorId
);

produtoRotas.post(
  "/",
  validateBody(cadastrarProdutoSchema),
  async (req, res, next): Promise<any> => {
    return produtoController.cadastrar(req, res, next);
  }
);

produtoRotas.patch(
  "/:id",
  validateParams(paramIdNumberSchema),
  validateBody(cadastrarProdutoSchema),
  async (req, res, next): Promise<any> => {
    return produtoController.atualizar(req, res, next);
  }
);

produtoRotas.delete(
  "/:id",
  validateParams(paramIdNumberSchema),
  async (req, res, next): Promise<any> => {
    return produtoController.remover(req, res, next);
  }
);

produtoRotas.get(
  "/categorias/:categoria",
  validateParams(categoriaSchema),
  async (req, res, next): Promise<any> => {
    return produtoController.listarPorCategoria(req, res, next);
  }
);

produtoRotas.get(
  "/:id",
  validateParams(paramIdNumberSchema),
  async (req, res, next): Promise<any> => {
    return produtoController.buscarPorId(req, res, next);
  }
);

export default produtoRotas;

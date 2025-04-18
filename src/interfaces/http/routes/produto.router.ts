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

const produtoRotas = Router();

const prismaClient = new PrismaClient();
const produtoRepository = new ProdutoRepository(prismaClient);
const cadastrarProdutoUseCase = new CadastrarProdutoUsecase(produtoRepository);
const listarProdutosPorCategoriaUseCase = new ListarProdutosPorCategoriaUsecase(produtoRepository);
const atualizarProdutoUseCase = new AtualizarProdutoUsecase(produtoRepository);
const removerProdutoUseCase = new RemoverProdutoUsecase(produtoRepository);

const produtoController = new ProdutoController(
  cadastrarProdutoUseCase,
  atualizarProdutoUseCase,
  removerProdutoUseCase,
  listarProdutosPorCategoriaUseCase
);

produtoRotas.post(
  "/",
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

export default produtoRotas;

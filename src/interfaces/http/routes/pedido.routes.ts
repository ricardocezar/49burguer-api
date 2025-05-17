import { PedidoRepository } from "@/infrastructure/database/prisma/repositories/PedidoRepository";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { PedidoController } from "../controllers/PedidoController";
import { CriarPedidoUseCase } from "@/application/use-cases/pedido/CriarPedidoUseCase";
import { ClienteRepository } from "@/infrastructure/database/prisma/repositories/ClienteRepository";
import { ProdutoRepository } from "@/infrastructure/database/prisma/repositories/ProdutoRepository";
import { criarPedidoSchema } from "../validators/pedido/criarPedidoSchema";
import { validateBody } from "../middlewares/validateRequest";

const pedidoRotas = Router();

const prismaClient = new PrismaClient();
const pedidoRepository = new PedidoRepository(prismaClient);
const clienteRepository = new ClienteRepository(prismaClient);
const produtoRepository = new ProdutoRepository(prismaClient);
const criarPedidoUseCase = new CriarPedidoUseCase(
  pedidoRepository,
  clienteRepository,
  produtoRepository
);
const pedidoController = new PedidoController(criarPedidoUseCase);

pedidoRotas.post(
  "/",
  validateBody(criarPedidoSchema),
  async (req, res, next) => {
    pedidoController.cadastrar(req, res, next);
  }
);

export default pedidoRotas;
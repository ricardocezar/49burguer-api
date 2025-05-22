import { Router } from "express";
import { PedidoController } from "../controllers/PedidoController";
import { criarPedidoSchema } from "../validators/pedido/criarPedidoSchema";
import { validateBody, validateParams, validateQuery } from "../middlewares/validateRequest";
import { paramUuidSchema } from "../validators/param-id-uuid.schema";
import { listarPedidosPorStatusEDataSchema } from "../validators/pedido/listarPedidosPorStatusEDataSchema";
import { pedidoUseCases } from "./di-utils";
import { incluirClienteNoPedidoSchema } from "../validators/pedido/incluirClienteNoPedidoSchema";
import { adicionarItensSchema } from "../validators/pedido/adicionarItensSchema";
import { idPedidoEidProdutoParamSchema } from "../validators/pedido/idPedidoEidProdutoParamSchema";
import { alterarQuantidadeSchema } from "../validators/pedido/alterarQuantidadeSchema";

const pedidoRotas = Router();

const pedidoController = new PedidoController(
  pedidoUseCases.criarPedido,
  pedidoUseCases.alterarPedido,
  pedidoUseCases.buscarPedidoPorId,
  pedidoUseCases.removerPedido,
  pedidoUseCases.buscarPedidosPorStatusEData,
  pedidoUseCases.cancelarPedidoUsecase,
  pedidoUseCases.obterClienteDoPedido,
  pedidoUseCases.incluirClienteNoPedidoUseCase,
  pedidoUseCases.substituirProdutoNoPedido,
  pedidoUseCases.removerClienteDoPedidoUseCase,
  pedidoUseCases.listarItensDoPedidoUseCase,
  pedidoUseCases.adicionarProdutoAoPedidoUseCase,
  pedidoUseCases.substituirQuantidadeUseCase,
  pedidoUseCases.removerProdutUseCase
);

pedidoRotas.post(
  "/",
  validateBody(criarPedidoSchema),
  async (req, res, next) => {
    pedidoController.cadastrar(req, res, next);
  }
);

pedidoRotas.get(
  "/",
  validateQuery(listarPedidosPorStatusEDataSchema),
  async (req, res, next) => {
    pedidoController.listarPorStatusEData(req, res, next);
  }
);

pedidoRotas.get(
  "/:id",
  validateParams(paramUuidSchema),
  async (req, res, next) => {
    pedidoController.buscarPorId(req, res, next);
  }
);

pedidoRotas.delete(
  "/:id",
  validateParams(paramUuidSchema),
  async (req, res, next) => {
    pedidoController.remover(req, res, next);
  }
);

pedidoRotas.post(
  "/:id/alterar",
  validateParams(paramUuidSchema),
  validateBody(criarPedidoSchema),
  async (req, res, next) => {
    pedidoController.alterar(req, res, next);
  }
);

pedidoRotas.get(
  "/:id/cliente",
  validateParams(paramUuidSchema),
  async (req, res, next) => {
    pedidoController.obterCliente(req, res, next);
  }
);

pedidoRotas.post(
  "/:id/cliente",
  validateParams(paramUuidSchema),
  validateBody(incluirClienteNoPedidoSchema),
  async (req, res, next) => {
    pedidoController.incluirCliente(req, res, next);
  }
);

pedidoRotas.delete(
  "/:id/cliente/:cpf",
  validateParams(paramUuidSchema),
  async (req, res, next) => {
    pedidoController.removerCliente(req, res, next);
  }
);

pedidoRotas.put(
  "/:id/cliente/:cpf",
  validateParams(paramUuidSchema),
  validateParams(incluirClienteNoPedidoSchema),
  validateBody(incluirClienteNoPedidoSchema),
  async (req, res, next) => {
    pedidoController.substituirCliente(req, res, next);
  }
);

pedidoRotas.get(
  "/:id/itens",
  validateParams(paramUuidSchema),
  async (req, res, next) => {
    pedidoController.listarItens(req, res, next);
  }
)

pedidoRotas.post(
  "/:id/itens",
  validateParams(paramUuidSchema),
  validateBody(adicionarItensSchema),
  async (req, res, next) => {
    pedidoController.adicionarProduto(req, res, next);
  }
);

pedidoRotas.put(
  "/:id/itens/produto/:produtoId",
  validateParams(idPedidoEidProdutoParamSchema),
  validateBody(alterarQuantidadeSchema),
  async (req, res, next) => {
    pedidoController.substituirQuantidade(req, res, next);
  }
)

pedidoRotas.delete(
  "/:id/itens/produto/:produtoId",
  validateParams(idPedidoEidProdutoParamSchema),
  async (req, res, next) => {
    pedidoController.removerProduto(req, res, next);
  }
);

export default pedidoRotas;

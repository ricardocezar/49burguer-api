import { Router } from "express";
import { validateBody, validateParams, validateQuery } from "../middlewares/validateRequest";
import { ClienteController } from "../controllers/ClienteController";
import { cadastrarClienteSchema } from "../validators/cadastrarClienteSchema";
import { ClienteRepository } from "../../../infrastructure/database/prisma/repositories/ClienteRepository";
import { CadastrarClienteUseCase } from "@/application/use-cases/cliente/CadastrarClienteUseCase";
import { PrismaClient } from "@prisma/client";
import { ListarClientesUseCase } from "@/application/use-cases/cliente/ListarClientesUseCase";
import { listarClientesSchema } from "../validators/listarClientesSchema";
import { BuscarClientePorCpfUsecase } from '../../../application/use-cases/cliente/BuscarClientePorCpfUseCase';
import { buscarClientePorCpfSchema } from "../validators/buscarClientePorCpfSchema";
import { AtualizarClienteUseCase } from "@/application/use-cases/cliente/AtualizarClienteUseCase";
import { RemoverClienteUseCase } from "@/application/use-cases/cliente/RemoverClienteUseCase";

const clienteRoutes = Router();
const prismaClient = new PrismaClient();
const clienteRepository = new ClienteRepository(prismaClient);
const cadastrarClienteUseCase = new CadastrarClienteUseCase(clienteRepository);
const listarClientesUseCase = new ListarClientesUseCase(clienteRepository);
const buscarClientePorCpfUsecase = new BuscarClientePorCpfUsecase(clienteRepository);
const atualizarClienteUseCase = new AtualizarClienteUseCase(clienteRepository);
const removerClienteUseCase = new RemoverClienteUseCase(clienteRepository);

const clienteController = new ClienteController(
  cadastrarClienteUseCase,
  listarClientesUseCase,
  buscarClientePorCpfUsecase,
  atualizarClienteUseCase,
  removerClienteUseCase
);

clienteRoutes.post(
  "/",
  validateBody(cadastrarClienteSchema),
  async (req, res, next): Promise<any> => {
    return clienteController.cadastrar(req, res, next);
  }
);

clienteRoutes.get("/",
  validateQuery(listarClientesSchema),
  async (req, res): Promise<any> => {
    return clienteController.listar(req, res);
  }
);

clienteRoutes.patch("/:cpf",
  validateParams(buscarClientePorCpfSchema),
  validateBody(cadastrarClienteSchema),
  async (req, res, next): Promise<any> => {
    return clienteController.atualizar(req, res, next);
  }
);

clienteRoutes.get("/:cpf",
  validateParams(buscarClientePorCpfSchema),
  async (req, res, next): Promise<any> => {
    return clienteController.buscarPorCpf(req, res, next);
});

export default clienteRoutes;

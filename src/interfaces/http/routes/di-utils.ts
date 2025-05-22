import { AdicionarProdutoAoPedidoUseCase } from "@/application/use-cases/pedido/AdicionarProdutoAoPedidoUseCase";
import { AlterarPedidoUseCase } from "@/application/use-cases/pedido/AlterarPedidoUseCase";
import { BuscarPedidoPorIdUseCase } from "@/application/use-cases/pedido/BuscarPedidoPorIdUseCase";
import { BuscarPedidosPorStatusEDataUseCase } from "@/application/use-cases/pedido/BuscarPedidosPorStatusEDataUseCase";
import { CancelarPedidoUseCase } from "@/application/use-cases/pedido/CancelarPedidoUseCase";
import { CriarPedidoUseCase } from "@/application/use-cases/pedido/CriarPedidoUseCase";
import { IncluirClienteNoPedidoUseCase } from "@/application/use-cases/pedido/IncluirClienteNoPedidoUseCase";
import { ListarItensDoPedidoUseCase } from "@/application/use-cases/pedido/ListarItensDoPedidoUseCase";
import { ObterClienteDoPedidoUseCase } from "@/application/use-cases/pedido/ObterClienteDoPedidoUseCase";
import { RemoverClienteDoPedidoUseCase } from "@/application/use-cases/pedido/RemoverClienteDoPedidoUseCase";
import { RemoverPedidoUseCase } from "@/application/use-cases/pedido/RemoverPedidoUseCase";
import { RemoverProdutoDoPedidoUseCase } from "@/application/use-cases/pedido/RemoverProdutoDoPedidoUseCase";
import { SubstituirClienteDoPedidoUseCase } from "@/application/use-cases/pedido/SubstituirClienteDoPedidoUseCase";
import { SubstituirQuantidadeDeProdutoNoPedidoUseCase } from "@/application/use-cases/pedido/SubstituirQuantidadeDeProdutoNoPedidoUseCase";
import { AtualizarProdutoUsecase } from "@/application/use-cases/produto/AtualizarProdutoUsecase";
import { CadastrarProdutoUsecase } from "@/application/use-cases/produto/CadastrarProdutoUsecase";
import { ListarProdutosPorCategoriaUsecase } from "@/application/use-cases/produto/ListarProdutosPorCategoriaUsecase";
import { ObterProdutoPorIdUseCase } from "@/application/use-cases/produto/ObterProdutoPorIdUseCase";
import { RemoverProdutoUsecase } from "@/application/use-cases/produto/RemoverProdutoUsecase";
import { ClienteRepository } from "@/infrastructure/database/prisma/repositories/ClienteRepository";
import { PedidoRepository } from "@/infrastructure/database/prisma/repositories/PedidoRepository";
import { ProdutoRepository } from "@/infrastructure/database/prisma/repositories/ProdutoRepository";
import { PrismaClient } from "@prisma/client";
import { func } from "joi";

const prismaClient = new PrismaClient({
  log: ["query", "info", "warn", "error"],
  errorFormat: "pretty"
});

function buildRepositories(prisma: PrismaClient) {
  return {
    pedido: new PedidoRepository(prisma),
    cliente: new ClienteRepository(prisma),
    produto: new ProdutoRepository(prisma),
  };
}

function buildPedidoUseCases(repos: ReturnType<typeof buildRepositories>) {
  return {
    criarPedido: new CriarPedidoUseCase(repos.pedido, repos.cliente, repos.produto),
    alterarPedido: new AlterarPedidoUseCase(repos.pedido, repos.cliente, repos.produto),
    buscarPedidoPorId: new BuscarPedidoPorIdUseCase(repos.pedido),
    removerPedido: new RemoverPedidoUseCase(repos.pedido),
    buscarPedidosPorStatusEData: new BuscarPedidosPorStatusEDataUseCase(repos.pedido),
    cancelarPedidoUsecase: new CancelarPedidoUseCase(repos.pedido),
    obterClienteDoPedido: new ObterClienteDoPedidoUseCase(repos.pedido),
    incluirClienteNoPedidoUseCase: new IncluirClienteNoPedidoUseCase(repos.pedido, repos.cliente),
    substituirProdutoNoPedido: new SubstituirClienteDoPedidoUseCase(repos.pedido, repos.cliente),
    removerClienteDoPedidoUseCase: new RemoverClienteDoPedidoUseCase(repos.pedido),
    listarItensDoPedidoUseCase: new ListarItensDoPedidoUseCase(repos.pedido),
    adicionarProdutoAoPedidoUseCase: new AdicionarProdutoAoPedidoUseCase(repos.pedido, repos.produto),
    substituirQuantidadeUseCase: new SubstituirQuantidadeDeProdutoNoPedidoUseCase(repos.pedido, repos.produto),
    removerProdutUseCase: new RemoverProdutoDoPedidoUseCase(repos.pedido)
  };
}

function buildProdutoUseCases(repos: ReturnType<typeof buildRepositories>) {
  return {
    cadastrarProduto: new CadastrarProdutoUsecase(repos.produto),
    listarProdutosPorCategoriaUseCase: new ListarProdutosPorCategoriaUsecase(repos.produto),
    atualizarProduto: new AtualizarProdutoUsecase(repos.produto),
    removerProduto: new RemoverProdutoUsecase(repos.produto),
    obterProdutoPorId: new ObterProdutoPorIdUseCase(repos.produto),
  };
}

const repositories = buildRepositories(prismaClient);

const pedidoUseCases = buildPedidoUseCases(repositories);
const produtoUseCases = buildProdutoUseCases(repositories);

export { pedidoUseCases, produtoUseCases };

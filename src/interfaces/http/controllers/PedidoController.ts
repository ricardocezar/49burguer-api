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
import { parseDateFromDDMMYYYY } from "@/interfaces/shared/DateConverter";

export class PedidoController {
  constructor(
    private cadastrarPedidoUseCase: CriarPedidoUseCase,
    private alterarPedidoUseCase: AlterarPedidoUseCase,
    private buscarPedidoPorIdUsecase: BuscarPedidoPorIdUseCase,
    private removerPedidoUseCase: RemoverPedidoUseCase,
    private buscarPedidosPorStatusEDataUseCase: BuscarPedidosPorStatusEDataUseCase,
    private cancelarPedidoUseCase: CancelarPedidoUseCase,
    private obterClienteDoPedidoUseCase: ObterClienteDoPedidoUseCase,
    private incluirClienteNoPedidoUseCase: IncluirClienteNoPedidoUseCase,
    private substituirProdutoNoPedido: SubstituirClienteDoPedidoUseCase,
    private removerClienteDoPedidoUseCase: RemoverClienteDoPedidoUseCase,
    private listarItensDoPedidoUseCase: ListarItensDoPedidoUseCase,
    private adicionarProdutoAoPedidoUseCase: AdicionarProdutoAoPedidoUseCase,
    private substituirQuantidadeUseCase: SubstituirQuantidadeDeProdutoNoPedidoUseCase,
    private removerProdutUseCase: RemoverProdutoDoPedidoUseCase
  ) {}

  async cadastrar(req: any, res: any, next: any) {
    try {
      const { cpf, itens, observacao } = req.body;
      const pedido = await this.cadastrarPedidoUseCase.execute({
        cpf,
        itens,
        observacao,
      });
      return res.status(201).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  async listarPorStatusEData(req: any, res: any, next: any) {
    try {
      console.dir(req.query, { depth: null });
      console.log("Query Params:", req.query);
      const { dataInicio, dataFim, status} = req.query;
      const pedidos = await this.buscarPedidosPorStatusEDataUseCase.execute({
        status,
        dataInicial: parseDateFromDDMMYYYY(dataInicio),
        dataFinal: parseDateFromDDMMYYYY(dataFim),
      });
      return res.status(200).json(pedidos);
    } catch (error) {
      console.error("Error in listarPorStatusEData:", error);
      return next(error);
    }
  }

  async buscarPorId(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const pedido = await this.buscarPedidoPorIdUsecase.execute(id);
      return res.status(200).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  async remover(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      await this.removerPedidoUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  async alterar(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const { itens, cliente, observacao } = req.body;
      const pedido = await this.alterarPedidoUseCase.execute({
        id,
        itens,
        cliente,
        observacao,
      });
      return res.status(200).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  async cancelar(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const pedido = await this.cancelarPedidoUseCase.execute(id);
      return res.status(200).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  async obterCliente(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const cliente = await this.obterClienteDoPedidoUseCase.execute(id);
      return res.status(200).json(cliente);
    } catch (error) {
      return next(error);
    }
  }

  async incluirCliente(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const { cpf } = req.body;
      const pedido = await this.incluirClienteNoPedidoUseCase.execute({
        pedidoId: id,
        cpf,
      });
      return res.status(200).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  async substituirCliente(req: any, res: any, next: any) {
    try {
      const { id, cpf: cpfAntigo } = req.params;
      const { cpf } = req.body;
      const pedido = await this.substituirProdutoNoPedido.execute({
        pedidoId: id,
        cpf,
        cpfAntigo,
      });
      return res.status(200).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  async removerCliente(req: any, res: any, next: any) {
    try {
      const { id, cpf } = req.params;
      const pedido = await this.removerClienteDoPedidoUseCase.execute({
        pedidoId: id,
        cpf,
      });
      return res.status(200).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  async listarItens(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const itens = await this.listarItensDoPedidoUseCase.execute(id);
      return res.status(200).json(itens);
    } catch (error) {
      return next(error);
    }
  }

  async adicionarProduto(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const { itens } = req.body;
      console.log("Itens:", itens);
      const pedido = await this.adicionarProdutoAoPedidoUseCase.execute({
        pedidoId: id,
        itens,
      });
      return res.status(200).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  async substituirQuantidade(req: any, res: any, next: any) {
    try {
      const { id, produtoId } = req.params;
      const { quantidade } = req.body;
      const pedido = await this.substituirQuantidadeUseCase.execute({
        pedidoId: id,
        produtoId: Number(produtoId),
        quantidade,
      });
      return res.status(200).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  async removerProduto(req: any, res: any, next: any) {
    try {
      const { id, produtoId } = req.params;
      const pedido = await this.removerProdutUseCase.execute({
        pedidoId: id,
        produtoId,
      });
      return res.status(200).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  /*

  async checkout(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const pedido = await this.atualizarPedido.execute(id, {
        status: "RECEBIDO",
      });
      return res.status(200).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  async iniciarPreparo(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const pedido = await this.atualizarPedido.execute(id, {
        status: "EM_PREPARACAO",
      });
      return res.status(200).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  async finalizarPreparo(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const pedido = await this.atualizarPedido.execute(id, {
        status: "FINALIZADO",
      });
      return res.status(200).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  async finalizar(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const pedido = await this.atualizarPedido.execute(id, {
        status: "FINALIZADO",
      });
      return res.status(200).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  async entregar(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const pedido = await this.atualizarPedido.execute(id, {
        status: "ENTREGUE",
      });
      return res.status(200).json(pedido);
    } catch (error) {
      return next(error);
    }
  }

  async remover(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      await this.removerPedidoUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
    */
}

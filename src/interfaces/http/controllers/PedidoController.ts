import { CriarPedidoUseCase } from "@/application/use-cases/pedido/CriarPedidoUseCase";

export class PedidoController {
  constructor(
    private cadastrarPedidoUseCase: CriarPedidoUseCase
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
  /*
  async atualizar(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const { itens, observacao } = req.body;
      const pedido = await this.atualizarPedido.execute(id, {
        itens,
        observacao,
      });
      return res.status(200).json(pedido);
    } catch (error) {
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

  async listarPorStatus(req: any, res: any, next: any) {
    try {
      const { status } = req.params;
      const pedidos = await this.listarPedidoUseCase.execute({ status });
      return res.status(200).json(pedidos);
    } catch (error) {
      return next(error);
    }
  }

  async listarPorDataEStatus(req: any, res: any, next: any) {
    try {
      const { data, status } = req.params;
      const pedidos = await this.listarPedidoUseCase.execute({ data, status });
      return res.status(200).json(pedidos);
    } catch (error) {
      return next(error);
    }
  }

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

  async cancelar(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const pedido = await this.atualizarPedido.execute(id, {
        status: "CANCELADO",
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

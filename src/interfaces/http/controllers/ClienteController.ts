import { AtualizarClienteUseCase } from "@/application/use-cases/cliente/AtualizarClienteUseCase";
import { BuscarClientePorCpfUsecase } from "@/application/use-cases/cliente/BuscarClientePorCpfUseCase";
import { CadastrarClienteUseCase } from "@/application/use-cases/cliente/CadastrarClienteUseCase";
import { ListarClientesUseCase } from "@/application/use-cases/cliente/ListarClientesUseCase";
import { RemoverClienteUseCase } from "@/application/use-cases/cliente/RemoverClienteUseCase";

export class ClienteController {
  constructor(
    private cadastrarClienteUseCase: CadastrarClienteUseCase,
    private listarClienteUseCase: ListarClientesUseCase,
    private buscarClientePorCpfUsecase: BuscarClientePorCpfUsecase,
    private atualizarCliente: AtualizarClienteUseCase,
    private removerClienteUseCase: RemoverClienteUseCase,
  ) {}

  async cadastrar(req: any, res: any, next: any) {
    try {
      const { nome, cpf, email } = req.body;
      const cliente = await this.cadastrarClienteUseCase.execute({ nome, cpf, email });
      return res.status(201).json(cliente);
    } catch (error) {
      return next(error);
    }
  }

  async atualizar(req: any, res: any, next: any) {
    try {
      const { cpf } = req.params;
      const { nome, email } = req.body;
      const cliente = await this.atualizarCliente.execute(cpf, { nome, email });
      return res.status(200).json(cliente);
    } catch (error) {
      return next(error);
    }
  }

  async listar(req: any, res: any) {
    const { pagina, quantidade } = req.query;
    const clientes = await this.listarClienteUseCase.execute({
      pagina,
      quantidade,
    });
    return res.status(200).json(clientes);
  }

  async buscarPorCpf(req: any, res: any, next: any) {
    try {
      const { cpf } = req.params;
      const cliente = await this.buscarClientePorCpfUsecase.execute(cpf);
      return res.status(200).json(cliente);
    } catch (error) {
      return next(error);
    }
  }

  async remover(req: any, res: any, next: any) {
    try {
      const { cpf } = req.params;
      await this.removerClienteUseCase.execute(cpf);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}

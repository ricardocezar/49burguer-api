import { ClienteOutputDTO } from "@/application/dtos/cliente/ClienteOutputDTO";
import { ClienteInputDTO } from "@/application/dtos/pedido/ClienteInputDTO";
import { Cpf } from "@/domain/entities/cliente/Cpf";
import { ClienteNaoEncontradoException } from "@/domain/errors/ClienteNaoEncontradoException";
import { PedidoNaoEncontradoException } from "@/domain/errors/PedidoNaoEncontradoException";
import { IClienteRepository } from "@/domain/repositories/IClienteRepository";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";

export class IncluirClienteNoPedidoUseCase {
  constructor(
    private readonly pedidoRepository: IPedidoRepository,
    private readonly clienteRepository: IClienteRepository
  ) {}

  async execute(input: ClienteInputDTO): Promise<ClienteOutputDTO> {
    const pedido = await this.pedidoRepository.buscarPorId(input.pedidoId);
    if (!pedido) {
      throw new PedidoNaoEncontradoException(input.pedidoId);
    }
    const cpfValidado = new Cpf(input.cpf);
    const cliente = await this.clienteRepository.buscarPorCpf(
      cpfValidado.numero
    );
    if (!cliente) {
      throw new ClienteNaoEncontradoException(input.cpf);
    }

    pedido.identificarCliente(cliente);
    await this.pedidoRepository.atualizar(pedido);
    return new ClienteOutputDTO(
      cliente!.getNome(),
      cliente!.getCpf(),
      cliente!.getEmail()
    );
  }
}

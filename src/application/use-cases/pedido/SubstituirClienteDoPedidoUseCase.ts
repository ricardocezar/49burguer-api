import { ClienteOutputDTO } from "@/application/dtos/cliente/ClienteOutputDTO";
import { SubstituirClienteInputDTO } from "@/application/dtos/pedido/SubstituirClienteInputDTO";
import { Cpf } from "@/domain/entities/cliente/Cpf";
import { ClienteNaoEncontradoException } from "@/domain/errors/ClienteNaoEncontradoException";
import { PedidoNaoEncontradoException } from "@/domain/errors/PedidoNaoEncontradoException";
import { IClienteRepository } from "@/domain/repositories/IClienteRepository";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";

export class SubstituirClienteDoPedidoUseCase {
  constructor(
    private pedidoRepository: IPedidoRepository,
    private clienteRepository: IClienteRepository
  ) {}

  async execute(input: SubstituirClienteInputDTO): Promise<ClienteOutputDTO> {
    const pedido = await this.pedidoRepository.buscarPorId(input.pedidoId);
    if (!pedido) {
      throw new PedidoNaoEncontradoException(input.pedidoId);
    }
    if (pedido.getCliente() === null) {
      throw new ClienteNaoEncontradoException(input.cpfAntigo);
    }
    if (pedido.getCliente()!.getCpf() !== new Cpf(input.cpfAntigo).numero) {
      throw new ClienteNaoEncontradoException(input.cpfAntigo);
    }
    const cpfValidado = new Cpf(input.cpf);
    const cliente = await this.clienteRepository.buscarPorCpf(
      cpfValidado.numero
    );
    if (!cliente) {
      throw new ClienteNaoEncontradoException(input.cpf);
    }
    pedido.substituirCliente(cliente);
    await this.pedidoRepository.atualizar(pedido);
    return new ClienteOutputDTO(
      cliente!.getNome(),
      cliente!.getCpf(),
      cliente!.getEmail()
    );
  }
}

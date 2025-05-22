import { ClienteInputDTO } from "@/application/dtos/pedido/ClienteInputDTO";
import { Cpf } from "@/domain/entities/cliente/Cpf";
import { PedidoNaoEncontradoException } from "@/domain/errors/PedidoNaoEncontradoException";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";

export class RemoverClienteDoPedidoUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async execute(input: ClienteInputDTO): Promise<void> {
    const pedido = await this.pedidoRepository.buscarPorId(input.pedidoId);
    if (!pedido) {
      throw new PedidoNaoEncontradoException(input.pedidoId);
    }
    const cpfValidado = new Cpf(input.cpf);
    pedido.removerCliente(cpfValidado.numero);
    await this.pedidoRepository.atualizar(pedido);
  }
}

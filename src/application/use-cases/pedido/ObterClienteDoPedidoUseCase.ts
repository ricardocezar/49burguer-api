import { ClienteOutputDTO } from "@/application/dtos/cliente/ClienteOutputDTO";
import { PedidoNaoEncontradoException } from "@/domain/errors/PedidoNaoEncontradoException";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";

export class ObterClienteDoPedidoUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async execute(id: string): Promise<ClienteOutputDTO | undefined> {
    const pedido = await this.pedidoRepository.buscarPorId(id);
    if (!pedido) {
      throw new PedidoNaoEncontradoException(id);
    }
    const cliente = pedido.getCliente();
    return cliente ?
      new ClienteOutputDTO(cliente.getCpf(), cliente.getNome(), cliente.getEmail())
      : undefined;
  }
}

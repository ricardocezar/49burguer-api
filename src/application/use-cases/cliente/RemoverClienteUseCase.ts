import { ClienteNaoEncontradoException } from "@/domain/errors/ClienteNaoEncontradoException";
import { IClienteRepository } from "@/domain/repositories/IClienteRepository";

export class RemoverClienteUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(cpf: string): Promise<void> {
    const cliente = await this.clienteRepository.buscarPorCpf(cpf);
    if (!cliente) {
      throw new ClienteNaoEncontradoException(cpf);
    }
    await this.clienteRepository.remover(cliente.getCpf());
  }
}
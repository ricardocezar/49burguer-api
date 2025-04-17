import { AtualizarClienteInputDTO } from "@/application/dtos/cliente/AtualizarClienteInputDTO";
import { ClienteNaoEncontradoException } from "@/domain/errors/ClienteNaoEncontradoException";
import { IClienteRepository } from "@/domain/repositories/IClienteRepository";

export class AtualizarClienteUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(cpf: string, input: AtualizarClienteInputDTO): Promise<any> {
    const clienteExistente = await this.clienteRepository.buscarPorCpf(cpf);
    if (!clienteExistente) {
      throw new ClienteNaoEncontradoException(cpf);
    }
    clienteExistente.setNome(input.nome);
    const clienteAtualizado = await this.clienteRepository.atualizar(clienteExistente);
    return clienteAtualizado;
  }
}
import { ClienteNaoEncontradoException } from "@/domain/errors/ClienteNaoEncontradoException";
import { ClienteOutputDTO } from "../../dtos/cliente/ClienteOutputDTO";
import { IClienteRepository } from "@/domain/repositories/IClienteRepository";

export class BuscarClientePorCpfUsecase {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async execute(cpf: string): Promise<ClienteOutputDTO> {
    const cliente = await this.clienteRepository.buscarPorCpf(cpf);
    if (cliente) {
      return new ClienteOutputDTO(cliente.getNome(), cliente.getCpf());
    }
    throw new ClienteNaoEncontradoException(cpf);
  }
}
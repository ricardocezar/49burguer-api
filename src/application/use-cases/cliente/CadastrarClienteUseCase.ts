import { IClienteRepository } from "@/domain/repositories/IClienteRepository";
import { CadastrarClienteInputDTO } from "../../dtos/cliente/CadastrarClienteInputDTO";
import { Cliente } from "@/domain/entities/Cliente";
import { ClienteJaCadastradoException } from "@/domain/errors/ClienteJaCadastradoException";
import { ClienteOutputDTO } from "../../dtos/cliente/ClienteOutputDTO";

export class CadastrarClienteUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(input: CadastrarClienteInputDTO): Promise<ClienteOutputDTO> {
    const clienteExistente = await this.clienteRepository.buscarPorCpf(
      input.cpf
    );
    if (clienteExistente) throw new ClienteJaCadastradoException(input.cpf);
    const cliente = new Cliente({nome: input.nome, cpf: input.cpf});
    const clienteCadastrado = await this.clienteRepository.salvar(cliente);
    return new ClienteOutputDTO(clienteCadastrado.getNome(), clienteCadastrado.getCpf());
  }
}

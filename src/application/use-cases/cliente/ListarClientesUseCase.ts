import { IClienteRepository } from "@/domain/repositories/IClienteRepository";
import { ListaDeClientesOutputDTO } from "../../dtos/cliente/ListaDeClientesOutputDTO";
import { ClienteOutputDTO } from "@/application/dtos/cliente/ClienteOutputDTO";

export class ListarClientesUseCase {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async execute({
    pagina,
    quantidade,
  }: {
    pagina: number;
    quantidade: number;
  }): Promise<ListaDeClientesOutputDTO> {
    const result = await this.clienteRepository.buscarTodos(
      pagina,
      quantidade
    );
    const lista: ListaDeClientesOutputDTO = {
      clientes: result.dados.map(c => c as unknown as ClienteOutputDTO) || [],
      total: result.total,
      pagina: result.pagina,
      limite: result.limite,
      totalPaginas: result.totalPaginas,
    };
    return lista;
  }
}

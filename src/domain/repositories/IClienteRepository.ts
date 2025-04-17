import { Cliente } from "../entities/Cliente";
import { ResultadoPaginado } from "./ResultadoPaginado";

export interface IClienteRepository {
    buscarPorCpf(cpf: string): Promise<Cliente | null>;
    buscarTodos(page: number, limit: number): Promise<ResultadoPaginado<Cliente>>;
    salvar(cliente: Cliente): Promise<Cliente>;
    atualizar(cliente: Cliente): Promise<Cliente>;
    remover(id: number): Promise<void>;
}

import { Categoria } from "../entities/Categoria";
import { Produto } from "../entities/Produto";
import { ResultadoPaginado } from "./ResultadoPaginado";

export interface IProdutoRepository {
    buscarPorId(id: number): Promise<Produto | null>;
    buscarTodos(page: number, limit: number): Promise<ResultadoPaginado<Produto>>;
    salvar(produto: Produto): Promise<Produto>;
    atualizar(produto: Produto): Promise<Produto>;
    remover(id: number): Promise<void>;
    buscarPorCategoria(categoria: Categoria): Promise<Produto[]>;
}
import { Categoria } from "../entities/produto/Categoria";
import { Produto } from "../entities/produto/Produto";
import { ResultadoPaginado } from "./ResultadoPaginado";

export interface IProdutoRepository {
    buscarPorIds(ids: number[]): Promise<Produto[]>;
    buscarPorId(id: number): Promise<Produto | null>;
    buscarTodos(page: number, limit: number): Promise<ResultadoPaginado<Produto>>;
    salvar(produto: Produto): Promise<Produto>;
    atualizar(produto: Produto): Promise<Produto>;
    remover(id: number): Promise<void>;
    buscarPorCategoria(categoria: Categoria): Promise<Produto[]>;
}
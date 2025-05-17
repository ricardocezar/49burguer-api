import { Categoria } from '@/domain/entities/produto/Categoria';
import { Produto } from "@/domain/entities/produto/Produto";
import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";
import { ResultadoPaginado } from "@/domain/repositories/ResultadoPaginado";
import { PrismaClient, Categoria as PrismaCategoria } from "@prisma/client";

export class ProdutoRepository implements IProdutoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorId(id: number): Promise<Produto | null> {
    const produtoEncontrado = await this.prisma.produto.findUnique({
      where: { id, ativo: true },
    });
    if (!produtoEncontrado) {
      return null;
    }
    return new Produto(
      produtoEncontrado.descricao,
      produtoEncontrado.preco,
      produtoEncontrado.categoria,
      produtoEncontrado.id
    );
  }

  async buscarPorIds(ids: number[]): Promise<Produto[]> {
    const produtosEncontrados = await this.prisma.produto.findMany({
      where: { id: { in: ids }, ativo: true },
    });
    return produtosEncontrados.map((produto) => {
      return new Produto(
        produto.descricao,
        produto.preco,
        produto.categoria,
        produto.id
      );
    });
  }

  async buscarTodos(
    page: number,
    limit: number
  ): Promise<ResultadoPaginado<Produto>> {
    const skip = (page - 1) * limit;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.produto.findMany({
        skip,
        take: Number(limit),
        where: { ativo: true },
      }),
      this.prisma.produto.count({ where: { ativo: true } }),
    ]);

    return {
      dados: data.map((produto) => {
        return new Produto(
          produto.descricao,
          produto.preco,
          produto.categoria,
          produto.id
        );
      }),
      totalPaginas: Math.ceil(total / limit),
      total,
      pagina: Number(page),
      limite: Number(limit),
    };
  }

  async salvar(produto: Produto): Promise<Produto> {
    const produtoCriado = await this.prisma.produto.create({
      data: {
        descricao: produto.getDescricao(),
        preco: produto.getPreco(),
        categoria: produto.getCategoria() as PrismaCategoria,
      },
    });
    return new Produto(
      produtoCriado.descricao,
      produtoCriado.preco,
      produtoCriado.categoria,
      produtoCriado.id
    );
  }

  async atualizar(produto: Produto): Promise<Produto> {
    const produtoAtualizado = await this.prisma.produto.update({
      where: { id: produto.getId(), ativo: true },
      data: {
        descricao: produto.getDescricao(),
        preco: produto.getPreco(),
        categoria: produto.getCategoria() as PrismaCategoria,
      },
    });
    return new Produto(
      produtoAtualizado.descricao,
      produtoAtualizado.preco,
      produtoAtualizado.categoria,
      produtoAtualizado.id
    );
  }

  async remover(id: number): Promise<void> {
    await this.prisma.produto.update({
      where: { id },
      data: { ativo: false },
    });
  }

  async buscarPorCategoria(categoria: Categoria): Promise<Produto[]> {
    return this.prisma.produto
      .findMany({
        where: { categoria: categoria.descricao as PrismaCategoria, ativo: true },
        orderBy: [{ categoria: "asc" }, { descricao: "asc" }],
      })
      .then((produtos) => {
        return produtos.map((produto) => {
          return new Produto(
            produto.descricao,
            produto.preco,
            produto.categoria,
            produto.id
          );
        });
      });
  }
}

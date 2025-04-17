import { Cliente } from "@/domain/entities/Cliente";
import { IClienteRepository } from "@/domain/repositories/IClienteRepository";
import { ResultadoPaginado } from "@/domain/repositories/ResultadoPaginado";
import { PrismaClient } from "@prisma/client";

export class ClienteRepository implements IClienteRepository {
  constructor(private prisma: PrismaClient) {}

  async buscarPorCpf(cpf: string): Promise<Cliente | null> {
    const registro = await this.prisma.cliente.findUnique({
      where: { cpf },
    });
    if (!registro || !registro.ativo) return null;
    return new Cliente({nome: registro.nome, cpf: registro.cpf});
  }

  async buscarTodos(
    page: number = 1,
    limit: number = 15
  ): Promise<ResultadoPaginado<Cliente>> {
    const [total, registros] = await this.prisma.$transaction([
      this.prisma.cliente.count({where: { ativo: true }}),
      this.prisma.cliente.findMany({
        skip: (page - 1) * limit,
        take: Number(limit),
        where: { ativo: true },
      }),
    ]);

    const totalPaginas = Math.ceil(total / limit);

    const clientes = registros.map((registro: any) => {
      return new Cliente({nome: registro.nome, cpf: registro.cpf});
    });

    return {
      dados: clientes,
      total,
      pagina: Number(page),
      limite: Number(limit),
      totalPaginas,
    };
  }

  async salvar(cliente: Cliente): Promise<Cliente> {
    const novoCliente = await this.prisma.cliente.create({
      data: {
        nome: cliente.getNome(),
        cpf: cliente.getCpf(),
      },
    });
    return new Cliente({nome: novoCliente.nome, cpf: novoCliente.cpf});
  }

  async atualizar(cliente: Cliente): Promise<Cliente> {
    const clienteAtualizado = await this.prisma.cliente.update({
      where: { cpf: cliente.getCpf() },
      data: {
        nome: cliente.getNome(),
        cpf: cliente.getCpf(),
        atualizado_em: new Date()
      },
    });
    return new Cliente({nome: clienteAtualizado.nome, cpf: clienteAtualizado.cpf});
  }

  async remover(id: number): Promise<void> {
    await this.prisma.cliente.update({
      where: { id },
      data: { ativo: false, atualizado_em: new Date() },
    });
  }
}

import { Cliente } from "@/domain/entities/cliente/Cliente";
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
    return new Cliente({ nome: registro.nome, cpf: registro.cpf, email: registro.email });
  }

  async buscarTodos(
    page: number = 1,
    limit: number = 15
  ): Promise<ResultadoPaginado<Cliente>> {
    const [total, registros] = await this.prisma.$transaction([
      this.prisma.cliente.count({ where: { ativo: true } }),
      this.prisma.cliente.findMany({
        skip: (page - 1) * limit,
        take: Number(limit),
        where: { ativo: true },
      }),
    ]);

    const totalPaginas = Math.ceil(total / limit);

    const clientes = registros.map((registro: any) => {
      return new Cliente({ nome: registro.nome, cpf: registro.cpf, email: registro.email });
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
    const clienteInativoExistente = await this.prisma.cliente.findUnique({
      where: { cpf: cliente.getCpf(), ativo: false },
    });
    if (clienteInativoExistente) {
      const clienteAtualizado = await this.prisma.cliente.update({
        where: { cpf: cliente.getCpf() },
        data: {
          nome: cliente.getNome(),
          atualizadoEm: new Date(),
          ativo: true,
        },
      });
      return new Cliente({
        nome: clienteAtualizado.nome,
        cpf: clienteAtualizado.cpf,
        email: clienteAtualizado.email,
      });
    }
    const novoCliente = await this.prisma.cliente.create({
      data: {
        nome: cliente.getNome(),
        cpf: cliente.getCpf(),
        email: cliente.getEmail(),
      },
    });
    return new Cliente({ nome: novoCliente.nome, cpf: novoCliente.cpf, email: novoCliente.email });
  }

  async atualizar(cliente: Cliente): Promise<Cliente> {
    const clienteAtualizado = await this.prisma.cliente.update({
      where: { cpf: cliente.getCpf() },
      data: {
        nome: cliente.getNome(),
        cpf: cliente.getCpf(),
        atualizadoEm: new Date(),
      },
    });
    return new Cliente({
      nome: clienteAtualizado.nome,
      cpf: clienteAtualizado.cpf,
      email: clienteAtualizado.email,
    });
  }

  async remover(cpf: string): Promise<void> {
    await this.prisma.cliente.update({
      where: { cpf },
      data: { ativo: false, atualizadoEm: new Date() },
    });
  }
}

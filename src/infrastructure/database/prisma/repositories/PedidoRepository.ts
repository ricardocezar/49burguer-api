import { Cliente } from "@/domain/entities/cliente/Cliente";
import { Item } from "@/domain/entities/pedido/Item";
import { Pedido } from "@/domain/entities/pedido/Pedido";
import { Produto } from "@/domain/entities/produto/Produto";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";
import { PrismaClient, StatusPedido as PrismaStatus } from "@prisma/client";

export class PedidoRepository implements IPedidoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async salvar(pedido: Pedido): Promise<Pedido> {
    const cpfCliente = pedido.getCliente()?.getCpf() ?? null;
    const cliente = cpfCliente
      ? await this.prisma.cliente.findUnique({
          where: { cpf: pedido.getCliente()?.getCpf() },
        })
      : null;
    const pedidoCriado = await this.prisma.pedido.create({
      data: {
        id: pedido.getId()!,
        comanda: pedido.getComanda() ?? null,
        status: pedido.getStatus() as PrismaStatus,
        observacao: pedido.getObservacao(),
        dataCriado: pedido.getDataCriado(),
        clienteId: cliente?.id ?? null,
        itens: {
          create: pedido.getItens().map((item) => ({
            produto: {
              connect: {
                id: item.getProduto().getId(),
              },
            },
            pedidoId: pedido.getId(),
            valorIndividual: item.getProduto().getPreco(),
            quantidade: item.getQuantidade(),
          })),
        },
      },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
        cliente: true,
      },
    });

    return this.toDomain(pedidoCriado);
  }

  async atualizar(pedido: Pedido): Promise<Pedido> {
    console.log("atualizando pedido", pedido);
    const pedidoExistente = await this.prisma.pedido.findUnique({
      where: { id: pedido.getId() },
      include: {
        itens: true,
      },
    });
    if (!pedidoExistente) {
      throw new Error(`Pedido com id ${pedido.getId()} não encontrado.`);
    }
    const cpf = pedido.getCliente()?.getCpf() ?? null;
    const cliente = cpf
      ? await this.prisma.cliente.findUnique({
          where: { cpf: pedido.getCliente()?.getCpf() },
        })
      : null;
    const pedidoAtualizado = await this.prisma.pedido.update({
      where: { id: pedido.getId() },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
        cliente: true,
      },
      data: {
        clienteId: cliente?.id ?? null,
        status: pedido.getStatus() as PrismaStatus,
        observacao: pedido.getObservacao(),
        comanda: pedido.getComanda(),
        dataRecebido: pedido.getDataRecebido(),
        dataEmPreparo: pedido.getDataEmPreparo(),
        dataFinalizado: pedido.getDataFinalizado(),
        dataEntrega: pedido.getDataEntrega(),
        dataCancelado: pedido.getDataCancelado(),
        itens: {
          deleteMany: {
            pedidoId: pedido.getId(),
            produtoId: {
              notIn: pedido
                .getItens()
                .map((item) => item.getProduto()!.getId()!),
            },
          },
          upsert: pedido.getItens().map((item) => ({
            where: {
              pedidoId_produtoId: {
                pedidoId: pedido.getId()!,
                produtoId: item.getProduto()!.getId()!,
              },
            },
            create: {
              produto: { connect: { id: item!.getProduto()!.getId()! } },
              valorIndividual: item.getValorUnitario(),
              quantidade: item.getQuantidade(),
            },
            update: {
              valorIndividual: item.getValorUnitario(),
              quantidade: item.getQuantidade(),
            },
          })),
        },
      },
    });
    return this.toDomain(pedidoAtualizado);
  }

  async buscarPorId(id: string): Promise<Pedido | null> {
    const result = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
        cliente: true,
      },
    });
    if (!result) return null;
    return this.toDomain(result);
  }

  async buscarPorStatus(status: string): Promise<Pedido[]> {
    const result = await this.prisma.pedido.findMany({
      where: { status: status as PrismaStatus },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
        cliente: true,
      },
    });
    return result.map((pedido) => this.toDomain(pedido)) ?? [];
  }

  async buscarPorStatusEData(
    status: string | undefined | null,
    dataInicio: Date | undefined | null,
    dataFim: Date | undefined | null
  ): Promise<Pedido[]> {
    const whereClause: any = {};

    if (status !== null && status !== undefined) {
      whereClause.status = status;
    }

    if (dataInicio || dataFim) {
      whereClause.dataCriado = {};

      if (dataInicio) {
        whereClause.dataCriado.gte = dataInicio;
      }

      if (dataFim) {
        whereClause.dataCriado.lte = dataFim;
      }
    }

    const result = await this.prisma.pedido.findMany({
      where: whereClause,
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
        cliente: true,
      },
    });

    return result.map((pedido) => this.toDomain(pedido)) ?? [];
  }

  async remover(pedido: Pedido): Promise<void> {
    await this.prisma.pedido.delete({
      where: { id: pedido.getId() },
    });
  }

  toDomain(pedido: any): Pedido {
    return new Pedido(
      pedido.id,
      pedido.itens
        ? pedido.itens.map(
            (item: any) =>
              new Item(
                new Produto(
                  item.produto.descricao,
                  item.produto.preco,
                  item.produto.categoria,
                  item.produto.id
                ),
                item.quantidade
              )
          )
        : [],
      pedido.cliente
        ? new Cliente({
            nome: pedido.cliente.nome ?? undefined,
            cpf: pedido.cliente.cpf ?? undefined,
            email: pedido.cliente.email ?? undefined,
          })
        : undefined,
      pedido.observacao ?? undefined,
      pedido.status,
      pedido.comanda ?? undefined,
      pedido.dataCriado,
      pedido.dataRecebido ?? undefined,
      pedido.dataEmPreparo ?? undefined,
      pedido.dataFinalizado ?? undefined,
      pedido.dataEntrega ?? undefined,
      pedido.dataCancelado ?? undefined
    );
  }
}

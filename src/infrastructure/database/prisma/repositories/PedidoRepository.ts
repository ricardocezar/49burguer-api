import { Cliente } from "@/domain/entities/cliente/Cliente";
import { Item } from "@/domain/entities/pedido/Item";
import { Pedido } from "@/domain/entities/pedido/Pedido";
import { Produto } from "@/domain/entities/produto/Produto";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";
import { PrismaClient, StatusPedido as PrismaStatus } from "@prisma/client";

export class PedidoRepository implements IPedidoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async salvar(pedido: Pedido): Promise<Pedido> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { cpf: pedido.getCliente()?.getCpf() },
    });
    const pedidoCriado = await this.prisma.pedido.create({
      data: {
        id: pedido.getId(),
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
            valorIndividual: item.getValorTotalDoItem(),
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
      },
    });

    return this.toDomain(pedidoCriado);
  }

  async atualizar(pedido: Pedido): Promise<Pedido> {
    const pedidoExistente = await this.prisma.pedido.findUnique({
      where: { id: pedido.getId() },
      include: {
        itens: true,
      },
    });
    if (!pedidoExistente) {
      throw new Error(`Pedido com id ${pedido.getId()} não encontrado.`);
    }
    const cliente = await this.prisma.cliente.findUnique({
      where: { cpf: pedido.getCliente()?.getCpf() },
    });
    return this.prisma.pedido
      .update({
        where: { id: pedido.getId() },
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
            },
            create: pedido.getItens().map((item) => ({
              produto: {
                connect: {
                  id: item.getProduto().getId(),
                },
              },
              pedidoId: pedido.getId(),
              valorIndividual: item.getValorTotalDoItem(),
              quantidade: item.getQuantidade(),
            })),
          },
        },
      })
      .then((pedidoAtualizado) => this.toDomain(pedidoAtualizado));
  }

  async buscarPorId(id: string): Promise<Pedido | null> {
    const result = await this.prisma.pedido.findUnique({
      where: { id },
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
      },
    });
    return result.map((pedido) => this.toDomain(pedido)) ?? [];
  }

  async buscarPorStatusEData(
    status: string,
    dataInicio: Date,
    dataFim: Date
  ): Promise<Pedido[]> {
    const result = await this.prisma.pedido.findMany({
      where: {
        status: status as PrismaStatus,
        dataCriado: {
          gte: dataInicio,
          lte: dataFim,
        },
      },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
      },
    });
    return result.map((pedido) => this.toDomain(pedido)) ?? [];
  }

  toDomain(pedido: any): Pedido {
    return new Pedido(
      pedido.id,
      pedido.itens.map(
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
      ),
      pedido.cliente
        ? new Cliente({
            nome: pedido.cliente.nome,
            cpf: pedido.cliente.cpf,
            email: pedido.cliente.email,
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

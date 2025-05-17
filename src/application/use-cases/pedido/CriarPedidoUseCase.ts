import { CriarPedidoInputDTO } from "@/application/dtos/pedido/CriarPedidoInputDTO";
import { PedidoMapper } from "@/application/dtos/pedido/mapper/PedidoMapper";
import { PedidoOutputDTO } from "@/application/dtos/pedido/PedidoOutputDTO";
import { Item } from "@/domain/entities/pedido/Item";
import { Pedido } from "@/domain/entities/pedido/Pedido";
import { OperacaoNaoPermitidaException } from "@/domain/errors/OperacaoNaoPermitidaException";
import { IClienteRepository } from "@/domain/repositories/IClienteRepository";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";
import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";

export class CriarPedidoUseCase {
  constructor(
    private readonly pedidoRepository: IPedidoRepository,
    private readonly clienteRepository: IClienteRepository,
    private readonly produtoRepository: IProdutoRepository
  ) {}

  async execute(input: CriarPedidoInputDTO): Promise<PedidoOutputDTO> {
    const deveIdentificarCliente = input.cpf && input.cpf.length > 0;
    const cliente = deveIdentificarCliente
      ? await this.clienteRepository.buscarPorCpf(input.cpf!)
      : undefined;
    const produtos = await this.produtoRepository.buscarPorIds(
      input.itens?.map((item) => item.produtoId) ?? []
    );
    const itens = input.itens
      ? input.itens?.map((item) => {
          const produto = produtos.find((p) => p.getId() === item.produtoId);
          if (!produto) {
            throw new OperacaoNaoPermitidaException(
              "Criar Pedido",
              `Produto com ID ${item.produtoId} não encontrado`
            );
          }
          return new Item(produto, item.quantidade);
        })
      : [];
    let pedido = new Pedido(null, itens, cliente, input.observacao);
    pedido = await this.pedidoRepository.salvar(pedido);
    return PedidoMapper.toOutputDTO(pedido);
  }
}

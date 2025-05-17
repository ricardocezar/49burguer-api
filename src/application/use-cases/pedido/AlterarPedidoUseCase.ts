import { AlterarPedidoInputDTO } from "@/application/dtos/pedido/AlterarPedidoInputDTO";
import { PedidoMapper } from "@/application/dtos/pedido/mapper/PedidoMapper";
import { PedidoOutputDTO } from "@/application/dtos/pedido/PedidoOutputDTO";
import { Cpf } from "@/domain/entities/cliente/Cpf";
import { Pedido } from "@/domain/entities/pedido/Pedido";
import { Produto } from "@/domain/entities/produto/Produto";
import { ClienteNaoEncontradoException } from "@/domain/errors/ClienteNaoEncontradoException";
import { ItemInvalidoException } from "@/domain/errors/ItemInvalidoException";
import { PedidoNaoEncontradoException } from "@/domain/errors/PedidoNaoEncontradoException";
import { ProdutoNaoEncontradoException } from "@/domain/errors/ProdutoNaoEncontradoException";
import { IClienteRepository } from "@/domain/repositories/IClienteRepository";
import { IPedidoRepository } from "@/domain/repositories/IPedidoRepository";
import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";

export class AlterarPedidoUseCase {
  constructor(
    private readonly pedidoRepository: IPedidoRepository,
    private readonly clienteRepository: IClienteRepository,
    private readonly produtoRepository: IProdutoRepository
  ) {}

  async execute(input: AlterarPedidoInputDTO): Promise<PedidoOutputDTO> {
    const pedido = await this.pedidoRepository.buscarPorId(input.id);
    if (!pedido) {
      throw new PedidoNaoEncontradoException(input.id);
    }
    await this.alterarCliente(input, pedido);
    await this.alterarItens(input, pedido);
    if (input.observacao) {
      pedido.setObservacao(input.observacao);
    }
    const pedidoAtualizado = await this.pedidoRepository.atualizar(pedido);
    return PedidoMapper.toOutputDTO(pedidoAtualizado);
  }

  private async alterarCliente(input: AlterarPedidoInputDTO, pedido: Pedido) {
    if (!input.cliente) {
      return;
    }
    if (input.cliente.identificarCliente === false) {
      pedido.removerCliente();
      return;
    }
    if (!input.cliente.cpf) {
      return;
    }
    const cpfInput = new Cpf(input.cliente.cpf);
    if (cpfInput.numero === pedido.getCliente()?.getCpf()) {
      return;
    }
    const cliente = await this.clienteRepository.buscarPorCpf(
      input.cliente.cpf
    );
    if (!cliente) {
      throw new ClienteNaoEncontradoException(input.cliente.cpf);
    }
    pedido.identificarCliente(cliente);
  }

  private async alterarItens(input: AlterarPedidoInputDTO, pedido: Pedido) {
    if (!input.itens || input.itens.length === 0) {
      return;
    }
    const produtos = await this.produtoRepository.buscarPorIds(
      input.itens.filter((item) => !item.remover).map((item) => item.produtoId)
    );
    await this.removerProdutos(input, pedido);
    await this.alterarQuantidades(input, pedido, produtos);
    await this.adicionarNovosProdutos(input, pedido, produtos);
  }

  private async removerProdutos(input: AlterarPedidoInputDTO, pedido: Pedido) {
    const produtosARemover = input.itens!.filter(
      (item) => item.remover
    );
    if (produtosARemover.length === 0) {
      return;
    }
    produtosARemover.forEach((item) => {
      pedido.removerProduto(item.produtoId);
    });
  }

  private async alterarQuantidades(
    input: AlterarPedidoInputDTO,
    pedido: Pedido,
    produtos: Produto[]
  ) {
    const produtosAAlterar = input.itens!.filter(
      (item) => !item.remover && pedido.temOProduto(item.produtoId)
    );
    if (produtosAAlterar.length === 0) {
      return;
    }
    produtosAAlterar.forEach((item) => {
      if (!item.quantidade || item.quantidade <= 0) {
        throw new ItemInvalidoException(
          `Informe a quantidade do item ${item.produtoId}`
        );
      }
      const produto = produtos.find((p) => p.getId() === item.produtoId);
      if (!produto) {
        throw new ProdutoNaoEncontradoException(item.produtoId);
      }
      pedido.substituirQuantidadeDoProduto(produto, item.quantidade);
    });
  }

  private async adicionarNovosProdutos(
    input: AlterarPedidoInputDTO,
    pedido: Pedido,
    produtos: Produto[]
  ) {
    const produtosAAdicionar = input.itens!.filter(
      (item) => !item.remover && !pedido.temOProduto(item.produtoId)
    );
    if (produtosAAdicionar.length === 0) {
      return;
    }
    produtosAAdicionar.forEach((item) => {
      if (!item.quantidade || item.quantidade <= 0) {
        throw new ItemInvalidoException(
          `Informe a quantidade do item ${item.produtoId}`
        );
      }
      const produto = produtos.find((p) => p.getId() === item.produtoId);
      if (!produto) {
        throw new ProdutoNaoEncontradoException(item.produtoId);
      }
      pedido.adicionarProduto(produto, item.quantidade);
    });
  }
}

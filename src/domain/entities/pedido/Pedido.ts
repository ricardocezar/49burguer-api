import { Cliente } from "../cliente/Cliente";
import { FactoryComanda } from "./Comanda";
import { Item } from "./Item";
import { StatusPedido } from "./StatusPedido";
import { uuidv7 } from "uuidv7";
import { Produto } from "../produto/Produto";
import { PedidoEstado, recuperarEstado } from "./estado/PedidoEstado";
import { OperacaoNaoPermitidaException } from "@/domain/errors/OperacaoNaoPermitidaException";

export class Pedido {
  private state: PedidoEstado;
  private readonly id?: string;
  private cliente?: Cliente;
  private itens?: Item[];
  private comanda?: string;
  private observacao?: string;
  private status: StatusPedido;
  private dataCriado: Date;
  private dataRecebido?: Date;
  private dataEmPreparo?: Date;
  private dataFinalizado?: Date;
  private dataEntrega?: Date;
  private dataCancelado?: Date;

  constructor(
    id?: string | null,
    itens?: Item[],
    cliente?: Cliente | null,
    observacao?: string,
    status: string = StatusPedido.CRIADO,
    comanda?: string,
    dataCriado?: Date,
    dataRecebido?: Date,
    dataEmPreparo?: Date,
    dataFinalizado?: Date,
    dataEntrega?: Date,
    dataCancelado?: Date
  ) {
    this.id = id ?? uuidv7();
    this.itens = itens;
    this.cliente = cliente ?? undefined;
    this.observacao = observacao;
    this.status = status as StatusPedido;
    this.state = recuperarEstado(this.status, this);
    this.comanda = comanda;
    this.dataCriado = dataCriado ?? new Date();
    this.dataRecebido = dataRecebido;
    this.dataEmPreparo = dataEmPreparo;
    this.dataFinalizado = dataFinalizado;
    this.dataEntrega = dataEntrega;
    this.dataCancelado = dataCancelado;
  }

  public identificarCliente(cliente: Cliente): void {
    this.cliente = cliente;
  }

  public removerCliente(): void {
    this.cliente = undefined;
  }

  public temOProduto(produto: Produto | number): boolean {
    const idProduto = typeof produto === "number" ? produto : produto.getId();
    if (!idProduto) return false;
    if (!this.itens) return false;
    return this.itens.some((item) => item.getProduto().getId() === idProduto);
  }

  public adicionarProduto(produto: Produto, quantidade: number): void {
    if (this.pedidoNaoAceitaAlteracao()) {
      throw new OperacaoNaoPermitidaException(
        "Adicionar produtos a um pedido",
        `Para pedido com status ${this.status}`
      );
    }
    if (this.temOProduto(produto)) {
      throw new OperacaoNaoPermitidaException(`Adicionar produto ${produto.getDescricao()} já existente no pedido`);
    }
    if (this.itens === undefined) {
      this.itens = [];
    }
    const item = new Item(produto, quantidade);
    this.itens.push(item);
  }

  public substituirQuantidadeDoProduto(
    produto: Produto,
    quantidade: number
  ): void {
    if (this.pedidoNaoAceitaAlteracao()) {
      throw new OperacaoNaoPermitidaException(
        "Substituir quantidade de produtos de um pedido",
        `Para pedido com status ${this.status}`
      );
    }
    if (!this.temOProduto(produto)) {
      throw new OperacaoNaoPermitidaException(`Substir quantidade do produto ${produto.getDescricao()} NAO existente no pedido`);
    }
    const item = this.itens!.find((i) => i.getProduto().getId() === produto.getId());
    if (item) {
      item.substituirQuantidade(quantidade);
    }
  }

  public removerProduto(produto: Produto | number): boolean {
    const idProduto = typeof produto === "number" ? produto : produto.getId();
    if (!idProduto) return false;
    if (this.pedidoNaoAceitaAlteracao()) {
      throw new OperacaoNaoPermitidaException(
        "Remover produtos de um pedido",
        `Para pedido com status ${this.status}`
      );
    }
    if (!this.temOProduto(produto)) {
      return false;
    }
    this.itens = this.itens!.filter(
      (i) => i.getProduto().getId() !== idProduto
    );
    return true;
  }

  private pedidoNaoAceitaAlteracao(): boolean {
    return (
      this.status !== StatusPedido.CRIADO
    );
  }

  public receber(): void {
    const novaComanda = FactoryComanda.novaComanda();
    this.state.receberPedido();
    this.status = StatusPedido.RECEBIDO;
    this.comanda = novaComanda.senha.toString();
    this.dataRecebido = novaComanda.data;
  }

  public iniciarPreparo(): void {
    this.state.iniciarPreparacao();
    this.dataEmPreparo = new Date();
    this.status = StatusPedido.EM_PREPARACAO;
  }

  public finalizarPreparo(): void {
    this.state.finalizarPreparo();
    this.dataFinalizado = new Date();
    this.status = StatusPedido.FINALIZADO;
  }

  public entregar(): void {
    this.state.entregarPedido();
    this.dataEntrega = new Date();
    this.status = StatusPedido.ENTREGUE;
  }

  public cancelar(): void {
    this.state.cancelarPedido();
    this.dataCancelado = new Date();
    this.status = StatusPedido.CANCELADO;
  }

  public setEstado(estado: PedidoEstado): void {
    this.state = estado;
  }

  private calcularTotal(): number {
    if (!this.itens) return 0;
    return this.itens.reduce((total, item) => {
      return total + item.getValorTotalDoItem();
    }, 0);
  }

  public getId(): string | undefined {
    return this.id;
  }

  public getCliente(): Cliente | undefined {
    return this.cliente ?? undefined;
  }

  public getItens(): Item[] {
    return this.itens ?? [];
  }

  public getComanda(): string | undefined {
    return this.comanda;
  }

  public getValorTotal(): number {
    return this.calcularTotal();
  }

  public getStatus(): string {
    return this.status.toString();
  }

  public getDataCriado(): Date {
    return this.dataCriado;
  }

  public getDataRecebido(): Date | undefined {
    return this.dataRecebido;
  }

  public getDataEmPreparo(): Date | undefined {
    return this.dataEmPreparo;
  }

  public getDataFinalizado(): Date | undefined {
    return this.dataFinalizado;
  }

  public getDataEntrega(): Date | undefined {
    return this.dataEntrega;
  }

  public getDataCancelado(): Date | undefined {
    return this.dataCancelado;
  }

  public setObservacao(observacao: string) {
    if (this.pedidoNaoAceitaAlteracao()) {
      throw new OperacaoNaoPermitidaException(
        "Adicionar observação a um pedido",
        `Para pedido com status ${this.status}`
      );
    }
    this.observacao = observacao;
  }

  public getObservacao(): string | undefined {
    return this.observacao;
  }
}

import { Cliente } from "../cliente/Cliente";
import { Comanda, FactoryComanda } from "./Comanda";
import { Item } from "./Item";
import { StatusPedido } from "./StatusPedido";
import { uuidv7 } from "uuidv7";
import { Produto } from "../produto/Produto";
import { PedidoEstado, recuperarEstado } from "./estado/PedidoEstado";
import { PedidoCriadoEstado } from "./estado/PedidoCriadoEstado";
import { OperacaoNaoPermitidaNoStatusAtual } from "@/domain/errors/OperacaoNaoPermitidaNoStatusAtual";
import { ItemInvalidoException } from "@/domain/errors/ItemInvalidoException";

export class Pedido {
  private state: PedidoEstado;
  private readonly id: string;
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
    id?: string,
    itens?: Item[],
    cliente?: Cliente,
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
    this.cliente = cliente;
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

  public adicionarProduto(produto: Produto, quantidade: number): void {
    if (this.status !== StatusPedido.CRIADO) {
      throw new OperacaoNaoPermitidaNoStatusAtual(
        "Adicionar produtos a um pedido",
        this.status
      );
    }
    if (quantidade <= 0) {
      throw new ItemInvalidoException(
        `${produto.getDescricao} com quantidade menor ou igual a zero.`
      );
    }
    if (this.itens === undefined) {
      this.itens = [];
    }
    const itemExistente = this.itens.find(
      (i) => i.getProduto().getId() === produto.getId()
    );
    if (itemExistente) {
      itemExistente.adicionarQuantidade(quantidade);
      return;
    }
    const item = new Item(produto, quantidade);
    this.itens.push(item);
  }

  public removerProduto(produto: Produto, quantidade: number): void {
    if (this.status !== StatusPedido.CRIADO) {
      throw new OperacaoNaoPermitidaNoStatusAtual(
        "Remover produtos de um pedido",
        this.status
      );
    }
    if (!this.itens) return;
    const item = this.itens.find(
      (i) => i.getProduto().getId() === produto.getId()
    );
    if (item) {
      item.removerQuantidade(quantidade);
      if (item.vazio()) {
        this.itens = this.itens.filter((i) => i !== item);
      }
    }
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

  public getId(): string {
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

  public getTotal(): number {
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

  public getObservacao(): string | undefined {
    return this.observacao;
  }
}

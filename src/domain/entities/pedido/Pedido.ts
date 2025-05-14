import { Cliente } from "../cliente/Cliente";
import { Comanda, FactoryComanda } from "./Comanda";
import { Item } from "./Item";
import { StatusPedido } from "./StatusPedido";
import { uuidv7 } from 'uuidv7';
import { Produto } from '../produto/Produto';
import { PedidoEstado } from "./estado/PedidoEstado";
import { PedidoCriadoEstado } from "./estado/PedidoCriadoEstado";

export class Pedido {
  private state: PedidoEstado;
  private id: string;
  private cliente?: Cliente;
  private itens?: Item[];
  private comanda?: Comanda;
  private status: StatusPedido;
  private dataCriado: Date;
  private dataRecebido?: Date;
  private dataEmPreparo?: Date;
  private dataFinalizado?: Date;
  private dataEntrega?: Date;
  private dataCancelado?: Date;
  private observacao?: string;

  constructor(itens?: Item[], cliente?: Cliente, observacao?: string) {
    this.itens = itens;
    this.cliente = cliente;
    this.observacao = observacao;

    this.id = uuidv7();
    this.status = StatusPedido.CRIADO;
    this.state = new PedidoCriadoEstado(this);
    this.dataCriado = new Date();
  }

  public identificarCliente(cliente: Cliente): void {
    this.cliente = cliente;
  }

  public adicionarProduto(produto: Produto, quantidade: number): void {
    if (this.status !== StatusPedido.CRIADO) {
      throw new Error(`Não é possível adicionar produtos a um pedido ${this.status}.`);
    }
    if (quantidade <= 0) {
      throw new Error("A quantidade deve ser maior que zero.");
    }
    if (this.itens === undefined) {
      this.itens = [];
    }
    const itemExistente = this.itens.find((i) => i.getProduto().getId() === produto.getId());
    if (itemExistente) {
      itemExistente.adicionarQuantidade(quantidade);
      return;
    }
    const item = new Item(produto, quantidade);
    this.itens.push(item);
  }

  public removerProduto(produto: Produto, quantidade: number): void {
    if (this.status !== StatusPedido.CRIADO) {
      throw new Error(`Não é possível remover produtos de um pedido ${this.status}.`);
    }
    if (!this.itens) return;
    const item = this.itens.find((i) => i.getProduto().getId() === produto.getId());
    if (item) {
      item.removerQuantidade(quantidade);
      if (item.vazio()) {
        this.itens = this.itens.filter((i) => i !== item);
      }
    }
  }

  public receber(): void {
    this.state.receberPedido();
    this.status = StatusPedido.RECEBIDO;
    this.comanda = FactoryComanda.novaComanda();
    this.dataRecebido = this.comanda.data;
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
      return total + item.getValorDoItem();
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

  public getComanda(): Comanda | undefined {
    return this.comanda;
  }

  public getTotal(): number {
    return this.calcularTotal();
  }

  public getStatus(): string {
    return this.status.toString();
  }

  public getDataPedido(): Date {
    return this.dataCriado;
  }

  public getObservacao(): string | undefined {
    return this.observacao;
  }
}

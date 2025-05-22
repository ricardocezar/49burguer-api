export class PedidoOutputDTO {
  id: string;
  cliente?: {cpf?: string, nome: string};
  itensPorCategoria?: [
    {
      categoria: string;
      quantidade: number;
      valorSubtotal: number;
      produtos: {
        id: number;
        descricao: string;
        quantidade: number;
        valorUnitario: number;
      }[];
    }
  ] | [];
  valorTotal: number;
  comanda?: string;
  observacao?: string;
  status: string;
  dataPedido: Date;
  dataRecebido?: Date;
  dataEmPreparo?: Date;
  dataFinalizado?: Date;
  dataEntregue?: Date;
  dataCancelado?: Date;

  constructor(
    id: string,
    cpf?: string,
    nome?: string,
    itensPorCategoria?: [
      {
        categoria: string;
        quantidade: number;
        valorSubtotal: number;
        produtos: {
          id: number;
          descricao: string;
          quantidade: number;
          valorUnitario: number;
        }[];
      }
    ],
    valorTotal?: number,
    comanda?: string,
    observacao?: string,
    status: string = "CRIADO",
    dataCriado?: Date,
    dataRecebido?: Date,
    dataEmPreparo?: Date,
    dataFinalizado?: Date,
    dataEntrega?: Date,
    dataCancelado?: Date
  ) {
    this.id = id;
    this.cliente = {cpf: cpf || undefined, nome: nome || 'Consumidor'};
    this.itensPorCategoria = itensPorCategoria;
    this.valorTotal = valorTotal ?? 0;
    this.comanda = comanda;
    this.observacao = observacao;
    this.status = status;
    this.dataPedido = dataCriado ?? new Date();
    this.dataRecebido = dataRecebido;
    this.dataEmPreparo = dataEmPreparo;
    this.dataFinalizado = dataFinalizado;
    this.dataEntregue = dataEntrega;
    this.dataCancelado = dataCancelado;
  }
}
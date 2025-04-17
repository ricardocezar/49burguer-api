import { Cliente } from "@/domain/entities/Cliente";

export class ListaDeClientesOutputDTO {
  constructor(
    public clientes: Cliente[],
    public total: number,
    public pagina: number,
    public limite: number,
    public totalPaginas: number
  ) {}
}

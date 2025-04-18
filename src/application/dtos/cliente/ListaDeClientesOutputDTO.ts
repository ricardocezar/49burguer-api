import { ClienteOutputDTO } from "./ClienteOutputDTO";

export class ListaDeClientesOutputDTO {
  constructor(
    public clientes: ClienteOutputDTO[],
    public total: number,
    public pagina: number,
    public limite: number,
    public totalPaginas: number
  ) {}
}

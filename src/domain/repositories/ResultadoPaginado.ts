export class ResultadoPaginado<T> {
  constructor(
    public dados: T[],
    public total: number,
    public pagina: number,
    public limite: number,
    public totalPaginas: number
  ) {}
}

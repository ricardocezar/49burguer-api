export class CriarPedidoInputDTO {
  constructor(
    public readonly cpf?: string,
    public readonly itens?: {
      produtoId: number;
      quantidade: number;
    }[],
    public readonly observacao?: string,
  ) { }
}

export class Preco {
  private valor: number;
  private static readonly VALOR_MINIMO = 0.01;
  private static readonly VALOR_MAXIMO = 10000.0;

  constructor(valor: number) {
    if (valor < Preco.VALOR_MINIMO || valor > Preco.VALOR_MAXIMO) {
      throw new Error(`Valor inválido: ${valor}. Deve estar entre ${Preco.VALOR_MINIMO} e ${Preco.VALOR_MAXIMO}`);
    }
    this.valor = valor;
  }

  get valorFormatado(): string {
    return this.valor.toFixed(2).replace('.', ',');
  }

  get valorNumerico(): number {
    return this.valor;
  }
}
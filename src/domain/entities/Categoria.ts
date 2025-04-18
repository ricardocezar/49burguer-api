import { CategoriaInvalidaException } from "../errors/CategoriaInvalidaException";

enum CategoriaEnum {
  LANCHE = "LANCHE",
  ACOMPANHAMENTO = "ACOMPANHAMENTO",
  BEBIDA = "BEBIDA",
  SOBREMESA = "SOBREMESA",
}

export class Categoria {
  private valor: string;

  constructor(descricao: string) {
    const descricaoNormalizada = descricao.toUpperCase();
    if (!Object.values(CategoriaEnum).includes(descricaoNormalizada as CategoriaEnum)) {
      throw new CategoriaInvalidaException(descricao, Object.values(CategoriaEnum));
    }
    this.valor = descricao;
  }

  get descricao(): string {
    return this.valor;
  }
}
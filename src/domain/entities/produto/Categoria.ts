import { CategoriaInvalidaException } from "../../errors/CategoriaInvalidaException";

enum CategoriaEnum {
  LANCHE = "LANCHE",
  ACOMPANHAMENTO = "ACOMPANHAMENTO",
  BEBIDA = "BEBIDA",
  SOBREMESA = "SOBREMESA"
}

export class Categoria {
  private readonly valor: CategoriaEnum;

  constructor(descricao: string) {
    const descricaoNormalizada = descricao.toUpperCase();
    
    if (!this.isValidCategoria(descricaoNormalizada)) {
      throw new CategoriaInvalidaException(
        descricao, 
        Object.values(CategoriaEnum)
      );
    }
    
    this.valor = descricaoNormalizada as CategoriaEnum;
  }

  private isValidCategoria(value: string): value is CategoriaEnum {
    return Object.values(CategoriaEnum).includes(value as CategoriaEnum);
  }

  get descricao(): string {
    return this.valor;
  }

  equals(other: Categoria): boolean {
    return this.valor === other.valor;
  }

  toString(): string {
    return this.valor;
  }
  
  static LANCHE(): Categoria {
    return new Categoria(CategoriaEnum.LANCHE);
  }
  
  static ACOMPANHAMENTO(): Categoria {
    return new Categoria(CategoriaEnum.ACOMPANHAMENTO);
  }
  
  static BEBIDA(): Categoria {
    return new Categoria(CategoriaEnum.BEBIDA);
  }
  
  static SOBREMESA(): Categoria {
    return new Categoria(CategoriaEnum.SOBREMESA);
  }
}
export class Comanda {
  constructor(public readonly data: Date, public readonly senha: number) {}
}

export class FactoryComanda {
  private constructor() {}

  private static lastComanda: Comanda | null = null;
  
  public static novaComanda(): Comanda {
    if (!this.lastComanda) {
      this.lastComanda = new Comanda(new Date(), 1);
      return this.lastComanda;
    }
    if (this.lastComanda.data.getDate() !== new Date().getDate() 
      || this.lastComanda.data.getMonth() !== new Date().getMonth() 
      || this.lastComanda.data.getFullYear() !== new Date().getFullYear()
    ) {
      this.lastComanda = new Comanda(new Date(), 1);
      return this.lastComanda;
    }
    const novaSenha = this.lastComanda.senha + 1;
    const novaComanda = new Comanda(new Date(), novaSenha);
    this.lastComanda = novaComanda;
    return novaComanda;
  }
}

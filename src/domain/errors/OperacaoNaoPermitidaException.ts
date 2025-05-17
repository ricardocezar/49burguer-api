import { BaseDomainException } from "./BaseDomainException";

export class OperacaoNaoPermitidaException extends BaseDomainException {
  constructor(
    private readonly operacao: string,
    private readonly complemento?: string,
  ) {
    const mensagem = `Operação "${operacao}" não permitida${complemento? " " + complemento : ""}.`
    super(mensagem);
    this.name = "OperacaoNaoPermitidaNoStatusAtual";
  }
}

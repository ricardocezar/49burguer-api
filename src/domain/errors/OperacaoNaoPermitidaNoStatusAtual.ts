import { BaseDomainException } from "./BaseDomainException";

export class OperacaoNaoPermitidaNoStatusAtual extends BaseDomainException {
  constructor(
    public readonly operacao: string,
    public readonly statusAtual: string,
    public readonly mensagem: string = `Operação "${operacao}" não permitida no status "${statusAtual}".`
  ) {
    super(mensagem);
  }
}

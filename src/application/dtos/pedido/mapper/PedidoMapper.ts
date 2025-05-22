import { Pedido } from "@/domain/entities/pedido/Pedido";
import { PedidoOutputDTO } from "@/application/dtos/pedido/PedidoOutputDTO";

export class PedidoMapper {
  static toOutputDTO(pedido: Pedido): PedidoOutputDTO {
    if (!pedido) {
      return {} as PedidoOutputDTO;
    }
    let itensCategorizados: [] = [];
    if (pedido.getItens()) {
      itensCategorizados = pedido.getItens().reduce((acc, item) => {
        const categoria = item.getProduto().getCategoria();
        const produto = {
          id: item.getProduto().getId(),
          descricao: item.getProduto().getDescricao(),
          quantidade: item.getQuantidade(),
          valorUnitario: item.getValorUnitario(),
        };

        const categoriaExistente = acc.find(
          (cat) => cat.categoria === categoria
        );

        if (categoriaExistente) {
          const produtoExistente = categoriaExistente.produtos.find(
            (prod) =>
              prod.id === produto.id
          );

          if (produtoExistente) {
            produtoExistente.quantidade += produto.quantidade;
          } else {
            categoriaExistente.produtos.push(produto);
          }
          categoriaExistente.quantidade += item.getQuantidade();
          categoriaExistente.valorSubtotal += item.getValorTotalDoItem();
        } else {
          acc.push({
            categoria,
            quantidade: item.getQuantidade(),
            valorSubtotal: item.getValorTotalDoItem(),
            produtos: [produto],
          });
        }

        return acc;
      }, [] as any);
    }
    return {
      id: pedido.getId()!,
      cliente: pedido.getCliente()
        ? {
            cpf: pedido.getCliente()!.getCpf() ?? "",
            nome: pedido.getCliente()!.getNome() ?? "",
          }
        : undefined,
      itensPorCategoria: itensCategorizados,
      valorTotal: pedido.getValorTotal(),
      comanda: pedido.getComanda(),
      observacao: pedido.getObservacao(),
      status: pedido.getStatus(),
      dataPedido: pedido.getDataCriado(),
      dataRecebido: pedido.getDataRecebido(),
      dataEmPreparo: pedido.getDataEmPreparo(),
      dataFinalizado: pedido.getDataFinalizado(),
      dataEntregue: pedido.getDataEntrega(),
      dataCancelado: pedido.getDataCancelado(),
    };
  }
}

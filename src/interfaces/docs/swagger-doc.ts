import clientesApi from "./paths/cliente.apidocs";
import produtosApi from "./paths/produto.apidocs";
import { pedidosApi } from "./paths/pedido.apidocs";

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "49Burguer API",
    version: "1.0.0",
    description: "API para gerenciamento de clientes, pedidos e cardápio",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
    },
  ],
  tags: [
    {
      name: "Clientes",
      description: "Cadastro e Manutenção de clientes",
    },
    {
      name: "Produtos",
      description: "Cadastro e Manutenção de produtos",
    },
    {
      name: "Pedidos",
      description: "Criar e gerir de pedidos",
    },
  ],
  paths: {
    ...clientesApi,
    ...produtosApi,
    ...pedidosApi
  },
  components: {
    schemas: {
      Cliente: {
        type: "object",
        properties: {
          nome: { type: "string", example: "João Silva" },
          cpf: { type: "string", example: "123.456.789-00" },
          email: { type: "string", example: "email@email.com" },
        },
      },
      Produto: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
            description: "Identificador único do produto",
          },
          descricao: {
            type: "string",
            example: "Hambúrguer artesanal",
            description: "Descrição do produto",
          },
          preco: {
            type: "number",
            format: "float",
            example: 19.9,
            description: "Preço do produto (valor numérico)",
          },
          precoFormatado: {
            type: "string",
            example: "R$ 19,90",
            description: "Preço formatado para exibição",
          },
          categoria: {
            type: "string",
            enum: ["LANCHE", "ACOMPANHAMENTO", "BEBIDA", "SOBREMESA"],
            example: "LANCHE",
            description: "Categoria do produto",
          },
        },
      },
      Pedido: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          },
          cliente: {
            type: "object",
            required: ["nome"],
            properties: {
              cpf: { type: "string", example: "123.456.789-00" },
              nome: { type: "string", example: "João Silva" },
            },
          },
          itensPorCategoria: {
            type: "array",
            items: {
              type: "object",
              properties: {
                categoria: { type: "string", example: "LANCHE" },
                quantidade: { type: "integer", example: 2 },
                valorSubtotal: {
                  type: "number",
                  format: "float",
                  example: 29.98,
                },
                produtos: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer", example: 1 },
                      descricao: {
                        type: "string",
                        example: "Hambúrguer Artesanal",
                      },
                      quantidade: { type: "integer", example: 2 },
                      valorUnitario: {
                        type: "number",
                        format: "float",
                        example: 14.99,
                      },
                    },
                  },
                },
              },
            },
            example: [
              {
                categoria: "LANCHE",
                quantidade: 2,
                valorSubtotal: 29.98,
                produtos: [
                  {
                    id: 1,
                    descricao: "Hambúrguer Artesanal",
                    quantidade: 2,
                    valorUnitario: 14.99,
                  },
                ],
              },
            ],
          },
          valorTotal: { type: "number", format: "float", example: 59.9 },
          comanda: { type: "string", example: "15" },
          observacao: { type: "string", example: "Sem cebola" },
          status: {
            type: "string",
            enum: [
              "RECEBIDO",
              "EM_PREPARACAO",
              "PRONTO",
              "FINALIZADO",
              "CANCELADO",
              "ENTREGUE",
            ],
            example: "RECEBIDO",
          },
          dataPedido: {
            type: "string",
            format: "date-time",
            example: "2025-05-20T12:00:00Z",
          },
          dataRecebido: {
            type: "string",
            format: "date-time",
            example: "2025-05-20T12:05:00Z",
          },
          dataEmPreparo: {
            type: "string",
            format: "date-time",
            example: "2025-05-20T12:10:00Z",
          },
          dataFinalizado: {
            type: "string",
            format: "date-time",
            example: "2025-05-20T12:20:00Z",
          },
          dataEntregue: {
            type: "string",
            format: "date-time",
            example: "2025-05-20T12:30:00Z",
          },
          dataCancelado: {
            type: "string",
            format: "date-time",
            example: "2025-05-20T12:40:00Z",
          },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          error: { type: "string", example: "Bad Request" },
          message: { type: "string", example: "Erro ao cadastrar cliente" },
          path: { type: "string", example: "/clientes" },
          timestamp: {
            type: "string",
            format: "date-time",
            example: "2025-04-17T12:30:00Z",
          },
          details: {
            type: "array",
            items: { type: "string" },
            example: [
              "CPF fora do formato",
              "O nome deve ter pelo menos 3 caracteres",
            ],
          },
        },
      },
    },
  },
};

export default swaggerDocument;

import clientesApi from "./paths/clientes.apidocs";
import produtosApi from "./paths/produto.apidocs";

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
      name: "Cadastro de Clientes",
      description: "Endpoints relacionados aos clientes",
    },
    {
      name: "Cadastro de Produtos",
      description: "Endpoints relacionados aos produtos",
    },
  ],
  paths: {
    ...clientesApi,
    ...produtosApi,
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
            format: "uuid",
            example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          },
          dataHora: {
            type: "string",
            format: "date-time",
            example: "2025-04-17T12:30:00Z",
          },
          comanda: { type: "integer", example: 5 },
          cliente: {
            type: "object",
            properties: {
              nome: { type: "string", example: "João Silva" },
              cpf: { type: "string", example: "123.456.789-00" },
            },
          },
          categorias: {
            type: "array",
            items: {
              type: "object",
              properties: {
                descricao: {
                  type: "string",
                  example: "Lanche",
                  enum: ["Lanche", "Acompanhamento", "Bebida", "Sobremesa"],
                  description: "Categoria do produto",
                },
                produtos: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer", example: 1 },
                      descricao: { type: "string", example: "Hambúrguer" },
                      precoUnitario: {
                        type: "number",
                        format: "float",
                        example: 14.99,
                      },
                      quantidade: { type: "integer", example: 2 },
                      subTotal: {
                        type: "number",
                        format: "float",
                        example: 29.98,
                      },
                    },
                  },
                },
              },
            },
          },
          observacao: { type: "string", example: "Sem cebola" },
          status: {
            type: "string",
            enum: ["RECEBIDO", "EM_PREPARACAO", "PRONTO", "FINALIZADO"],
            example: "RECEBIDO",
          },
          total: { type: "number", format: "float", example: 29.99 },
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
              "O CPF já está cadastrado",
              "O nome deve ter pelo menos 3 caracteres",
            ],
          },
        },
      },
    },
  },
};

export default swaggerDocument;

import { alterarPedidoSchema } from "../../http/validators/pedido/alterarPedidoSchema";
import { criarPedidoSchema } from "../../http/validators/pedido/criarPedidoSchema";
const { convert } = require("joi-openapi");

export const pedidosApi = {
  "/v1/pedidos": {
    post: {
      tags: ["Pedidos"],
      summary: "Criar um novo pedido",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: convert(criarPedidoSchema),
          },
        },
      },
      responses: {
        201: {
          description: "Pedido criado com sucesso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Pedido",
              },
            },
          },
        },
        400: {
          description: "Erro de validação",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: [
          {
            description: "Produto não encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          {
            description: "Cliente não encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        ],
      },
    },
    get: {
      tags: ["Pedidos"],
      summary: "Listar todos os pedidos",
      description:
        "Retorna uma lista dos pedidos conforme os parametros de busca. Obrigatório informar pelo menos um dos parâmetros: status ou dataInicio",
      parameters: [
        {
          name: "status",
          in: "query",
          description:
            "Status do pedido (CRIADO, RECEBIDO, EM_PREPARACAO, PRONTO, FINALIZADO, CANCELADO)",
          required: false,
          schema: {
            type: "string",
            enum: [
              "CRIADO",
              "RECEBIDO",
              "EM_PREPARACAO",
              "PRONTO",
              "FINALIZADO",
              "CANCELADO",
            ],
          },
        },
        {
          name: "dataInicio",
          in: "query",
          description:
            "Data inicial de criação do Pedido (formato: DD-MM-YYYY)",
          required: false,
          schema: {
            type: "string",
            format: "date",
          },
        },
        {
          name: "dataFim",
          in: "query",
          description:
            "Data de final de criação do Pedido (formato: DD-MM-YYYY)",
          required: false,
          schema: {
            type: "string",
            format: "date",
          },
        },
      ],
      oneOf: [{required: ["status"]}, {required: ["dataInicio"]}],
      responses: {
        200: {
          description: "Lista de pedidos",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Pedido",
                },
              },
            },
          },
        },
        400: {
          description: "Erro de validação",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  "/v1/pedidos/{id}": {
    get: {
      tags: ["Pedidos"],
      summary: "Buscar um pedido específico",
      description: "Retorna os detalhes de um pedido específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do pedido",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Detalhes do pedido",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Pedido",
              },
            },
          },
        },
        404: {
          description: "Pedido não encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Pedidos"],
      summary: "Remover um pedido",
      description: "Remove um pedido específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do pedido",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        204: {
          description: "Pedido removido com sucesso",
        },
        404: [
          {
            description: "Pedido não encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          {
            description: "Produto não encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          {
            description: "Cliente não encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        ],
        409: {
          description: "Pedido em status que não permite alteração",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        422: {
          description: "Erro de validação (exemplo, CPF inválido)",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  "/v1/pedidos/{id}/alterar": {
    post: {
      tags: ["Pedidos"],
      summary: "Alterar um pedido",
      description: "Altera os detalhes de um pedido específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do pedido",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: convert(alterarPedidoSchema),
          },
        },
      },
      responses: {
        200: {
          description: "Pedido alterado com sucesso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Pedido",
              },
            },
          },
        },
        400: {
          description:
            "Erro de validação ou erro ao alterar o pedido (exemplo, ID inválido ou dados inválidos)",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: [
          {
            description:
              "Pedido não encontrado ou erro ao buscar o pedido (exemplo, ID não existe)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          {
            description: "Produto não encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          {
            description: "Cliente não encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        ],
      },
    },
  },
  "/v1/pedidos/{id}/cancelar": {
    post: {
      tags: ["Pedidos"],
      summary: "Cancelar um pedido",
      description: "Cancela um pedido específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do pedido",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Pedido cancelado com sucesso",
        },
        404: {
          description: "Pedido não encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  "/v1/pedidos/{id}/cliente": {
    get: {
      tags: ["Pedidos"],
      summary: "Buscar cliente de um pedido específico",
      description: "Retorna os detalhes do cliente de um pedido específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do pedido",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Detalhes do cliente do pedido",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Cliente",
              },
            },
          },
        },
        404: {
          description: "Pedido não encontrado ou cliente não encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Pedidos"],
      summary: "Adicionar cliente a um pedido específico",
      description: "Adiciona um cliente a um pedido específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do pedido",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                cpf: {
                  type: "string",
                  description: "CPF do cliente no formato XXX.XXX.XXX-XX",
                  pattern: "^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$",
                  example: "123.456.789-00",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Cliente adicionado com sucesso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Cliente",
              },
            },
          },
        },
        400: {
          description:
            "Erro de validação ou erro ao adicionar o cliente (exemplo, CPF inválido)",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: [
          {
            description:
              "Pedido não encontrado ou erro ao buscar o pedido (exemplo, ID não existe)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          {
            description: "Cliente não encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        ],
        409: {
          description: "Pedido em status que não permite alteração",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        422: {
          description: "Erro de validação (exemplo, CPF inválido)",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    }
  },
  "/v1/pedidos/{id}/cliente/{cpf}": {
    put: {
      tags: ["Pedidos"],
      summary: "Substituir cliente de um pedido específico",
      description: "Substitui o cliente de um pedido específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do pedido",
          schema: {
            type: "string",
          },
        },
        {
          name: "cpf",
          in: "path",
          required: true,
          pattern: "^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$",
          description: "CPF do Cliente Atual do Pedido",
          schema: { type: "string"}
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                cpf: {
                  type: "string",
                  pattern: "^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$",
                  description: "CPF do NOVO cliente no formato XXX.XXX.XXX-XX",
                  example: "123.456.789-00",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Cliente substituído com sucesso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Cliente",
              },
            },
          },
        },
        400: {
          description:
            "Erro de validação ou erro ao substituir o cliente (exemplo, CPF inválido)",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: [
          {
            description:
              "Pedido não encontrado ou erro ao buscar o pedido (exemplo, ID não existe)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          {
            description: "Cliente não encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        ],
        409: {
          description: "Pedido em status que não permite alteração",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        422: {
          description: "Erro de validação (exemplo, CPF inválido)",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Pedidos"],
      summary: "Remover cliente de um pedido específico",
      description: "Remove o cliente de um pedido específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do pedido",
          schema: {
            type: "string",
          },
        },
        {
          name: "cpf",
          in: "path",
          required: true,
          pattern: "^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$",
          description: "CPF do cliente no formato XXX.XXX.XXX-XX",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Cliente removido do pedido com sucesso",
        },
        404: {
          description:
            "Pedido não encontrado ou erro ao buscar o pedido (exemplo, ID não existe)",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  "/v1/pedidos/{id}/itens": {
    get: {
      tags: ["Pedidos"],
      summary: "Buscar produtos de um pedido específico",
      description: "Retorna os detalhes dos produtos de um pedido específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do pedido",
          schema: {
            type: "string",
          },
        },
        {
          name: "categoria",
          in: "query",
          description:
            "Categoria (LANCHE, ACOMPANHAMENTO, BEBIDA, SOBREMESA)",
          required: false,
          schema: {
            type: "string",
            enum: [
              "LANCHE",
              "ACOMPANHAMENTO",
              "BEBIDA",
              "SOBREMESA",
            ],
          },
        },
      ],
      responses: {
        200: {
          description: "Detalhes dos produtos do pedido",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Produto",
                },
              },
            },
          },
        },
        404: {
          description:
            "Pedido não encontrado ou erro ao buscar o pedido (exemplo, ID não existe)",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Pedidos"],
      summary: "Adicionar produtos a um pedido específico",
      description: "Adiciona produtos a um pedido específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do pedido",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                itens: {
                  type: "array",
                  description: "Lista de produtos a serem adicionados ao pedido",
                  items: {
                    type: "object",
                    properties: {
                      produtoId: {
                        type: "integer",
                        description: "ID do produto",
                        example: 1,
                      },
                      quantidade: {
                        type: "integer",
                        description:
                          "Quantidade do produto a ser adicionada ao pedido",
                        min: 1,
                        max: 30,
                        example: 2,
                      },
                    },
                    required: ["produtoId", "quantidade"],
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description:
            "Produtos adicionados com sucesso ao pedido, retorna o pedido atualizado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Pedido",
              },
            },
          },
        },
        400: {
          description:
            "Erro de validação ou erro ao adicionar os produtos (exemplo, ID inválido ou dados inválidos)",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: [
          {
            description:
              "Pedido não encontrado ou erro ao buscar o pedido (exemplo, ID não existe)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          {
            description:
              "Produto não encontrado ou erro ao buscar o produto (exemplo, ID não existe)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        ],
        409: {
          description:
            "Pedido em status que não permite alteração ou erro ao adicionar os produtos",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        422: {
          description:
            "Erro de validação (exemplo, CPF inválido ou dados inválidos)",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    }
  },
  "/v1/pedidos/{id}/itens/produto/{produtoId}": {
    put: {
      tags: ["Pedidos"],
      summary: "Alterar quantidade de produto específico",
      description: "Altera quantidade de produto específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do pedido",
          schema: {
            type: "string",
          },
        },
        {
          name: "produtoId",
          in: "path",
          required: true,
          description: "ID do produto a ser alterado no pedido",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                quantidade: {
                  type: "integer",
                  description:
                    "Nova quantidade do produto a ser alterada no pedido",
                  min: 1,
                  max: 30,
                  example: 2,
                },
              },
              required: ["quantidade"],
            },
          },
        },
      },
      responses: {
        200: {
          description:
            "Produto alterado com sucesso no pedido, retorna o pedido atualizado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Pedido",
              },
            },
          },
        },
        400: {
          description:
            "Erro de validação ou erro ao alterar o produto (exemplo, ID inválido ou dados inválidos)",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: [
          {
            description:
              "Pedido não encontrado ou erro ao buscar o pedido (exemplo, ID não existe)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          {
            description:
              "Produto não encontrado ou erro ao buscar o produto (exemplo, ID não existe)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        ],
        409: {
          description:
            "Pedido em status que não permite alteração ou erro ao alterar o produto",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Pedidos"],
      summary: "Remover produto de um pedido específico",
      description: "Remove produto de um pedido específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do pedido",
          schema: {
            type: "string",
          },
        },
        {
          name: "produtoId",
          in: "path",
          required: true,
          description: "ID do produto a ser removido do pedido",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description:
            "Produto removido com sucesso do pedido, retorna o pedido atualizado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Pedido",
              },
            },
          },
        },
        404: [
          {
            description:
              "Pedido não encontrado ou erro ao buscar o pedido (exemplo, ID não existe)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          {
            description:
              "Produto não encontrado ou erro ao buscar o produto (exemplo, ID não existe)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        ],
        409: {
          description:
            "Pedido em status que não permite alteração ou erro ao remover o produto",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  }
};

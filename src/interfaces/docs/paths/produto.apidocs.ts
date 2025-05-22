import { get } from "http";

const produtosApi = {
  "/v1/produtos": {
    post: {
      tags: ["Produtos"],
      summary: "Cadastrar um novo produto",
      description: "Cadastra um novo produto.",
      operationId: "cadastrarProduto",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                descricao: {
                  type: "string",
                  example: "Hambúrguer artesanal",
                  description: "Descrição do produto",
                },
                preco: {
                  type: "number",
                  format: "float",
                  example: 19.9,
                  description: "Novo preço do produto",
                },
                categoria: {
                  type: "string",
                  enum: ["LANCHE", "ACOMPANHAMENTO", "BEBIDA", "SOBREMESA"],
                  example: "LANCHE",
                  description: "Nova categoria do produto",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Produto cadastrado com sucesso.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Produto",
              },
            },
          },
        },
        400: {
          description: "Erro de validação.",
        },
        500: {
          description: "Erro interno do servidor.",
        },
      },
    },},
  "/v1/produtos/{id}": {
    get: {
      tags: ["Produtos"],
      summary: "Buscar um produto por ID",
      description: "Busca um produto pelo seu ID.",
      operationId: "buscarProdutoPorId",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do produto a ser buscado.",
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        200: {
          description: "Produto encontrado.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Produto",
              },
            },
          },
        },
        404: {
          description: "Produto não encontrado.",
        },
        500: {
          description: "Erro interno do servidor.",
        },
      },
    },
    patch: {
      tags: ["Produtos"],
      summary: "Atualizar um produto existente",
      description: "Atualiza os dados de um produto existente.",
      operationId: "atualizarProduto",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do produto a ser atualizado.",
          schema: {
            type: "integer",
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
                descricao: {
                  type: "string",
                  example: "Hambúrguer artesanal",
                  description: "Descrição do produto",
                },
                preco: {
                  type: "number",
                  format: "float",
                  example: 19.9,
                  description: "Novo preço do produto",
                },
                categoria: {
                  type: "string",
                  enum: ["LANCHE", "ACOMPANHAMENTO", "BEBIDA", "SOBREMESA"],
                  example: "LANCHE",
                  description: "Nova categoria do produto",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Produto atualizado com sucesso.",
          content: {
            "application/json": {
              schema: {
                description: "Produto atualizado com sucesso.",
                $ref: "#/components/schemas/Produto",
              },
            },
          },
        },
        400: {
          description: "Erro de validação.",
        },
        404: {
          description: "Produto não encontrado.",
        },
        500: {
          description: "Erro interno do servidor.",
        },
      },
    },
    delete: {
      tags: ["Produtos"],
      summary: "Remover um produto existente",
      description: "Remove um produto existente.",
      operationId: "removerProduto",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do produto a ser removido.",
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        204: {
          description: "Produto removido com sucesso.",
        },
        404: {
          description: "Produto não encontrado.",
        },
        500: {
          description: "Erro interno do servidor.",
        },
      },
    },
  },
  "/v1/produtos/categorias/{categoria}": {
    get: {
      tags: ["Produtos"],
      summary: "Listar produtos por categoria",
      description: "Lista todos os produtos de uma determinada categoria.",
      operationId: "listarProdutosPorCategoria",
      parameters: [
        {
          name: "categoria",
          in: "path",
          required: true,
          description: "Nome da categoria dos produtos.",
          enum: ["LANCHE", "ACOMPANHAMENTO", "BEBIDA", "SOBREMESA"],
          example: "LANCHE",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Lista de produtos por categoria.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  categoria: {
                    type: "string",
                    enum: ["LANCHE", "ACOMPANHAMENTO", "SOBREMESA", "BEBIDA"],
                    example: "LANCHE",
                    description: "Categoria dos produtos",
                  },
                  produtos: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Produto",
                    },
                    description: "Lista de produtos da categoria",
                  },
                  totalProdutos: {
                    type: "integer",
                    example: 5,
                    description: "Quantidade total de produtos na categoria",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Categoria não encontrada.",
        },
        500: {
          description: "Erro interno do servidor.",
        },
      },
    },
  },
};

export default produtosApi;
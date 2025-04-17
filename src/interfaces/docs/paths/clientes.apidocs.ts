const clientesApi = {
  "/clientes": {
    get: {
      tags: ["Cadastro de Clientes"],
      summary: "Listar todos os clientes",
      parameters: [
        {
          name: "pagina",
          in: "query",
          required: false,
          schema: { type: "integer", default: 1 },
        },
        {
          name: "quantidade",
          in: "query",
          required: false,
          schema: { type: "integer", default: 10 },
        },
      ],
      responses: {
        200: {
          description: "Lista de clientes",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  total: { type: "integer" },
                  pagina: { type: "integer" },
                  limite: { type: "integer" },
                  totalPaginas: { type: "integer" },
                  clientes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        nome: { type: "string" },
                        cpf: { type: "string" },
                      },
                    },
                  },
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
    post: {
      tags: ["Cadastro de Clientes"],
      summary: "Cadastrar um novo cliente",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome: {
                  type: "string",
                  minLength: 3,
                  maxLength: 50,
                  example: "João da Silva",
                },
                cpf: {
                  type: "string",
                  example: "12345678901",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Cliente criado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string", example: "João da Silva" },
                  cpf: { type: "string", example: "12345678901" },
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
  "/clientes/{cpf}": {
    get: {
      tags: ["Cadastro de Clientes"],
      summary: "Buscar cliente por CPF",
      parameters: [
        {
          name: "cpf",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          /* ... */
        },
        404: {
          description: "Cliente não encontrado",
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
};

export default clientesApi;

const clientesApi = {
  "/v1/clientes": {
    get: {
      tags: ["Clientes"],
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
                      schema: {
                        $ref: "#/components/schemas/Cliente",
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
      tags: ["Clientes"],
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
                  description: "Nome do cliente",
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                  example: "João da Silva",
                },
                cpf: {
                  type: "string",
                  description: "CPF do cliente no formato XXX.XXX.XXX-XX",
                  required: true,
                  minLength: 14,
                  maxLength: 14,
                  example: "123.456.789-01",
                  schema: {
                    type: "string",
                    pattern: "^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$",
                  },
                },
                email: {
                  type: "string",
                  format: "email",
                  description: "Email do cliente",
                  required: true,
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
                $ref: "#/components/schemas/Cliente",
              },
            },
          },
        },
        409: {
          description: "Conflito ao cadastrar cliente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
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
  "/v1/clientes/{cpf}": {
    get: {
      tags: ["Clientes"],
      summary: "Buscar cliente por CPF",
      parameters: [
        {
          name: "cpf",
          in: "path",
          required: true,
          description: "CPF do cliente no formato XXX.XXX.XXX-XX",
          schema: {
            type: "string",
            pattern: "^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$",
          },
        },
      ],
      responses: {
        200: {
          description: "Cliente encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Cliente",
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
    patch: {
      tags: ["Clientes"],
      summary: "Atualizar um cliente existente",
      parameters: [
        {
          name: "cpf",
          in: "path",
          required: true,
          description: "CPF do cliente no formato XXX.XXX.XXX-XX",
          schema: {
            type: "string",
            pattern: "^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$",
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
                nome: {
                  type: "string",
                  minLength: 3,
                  maxLength: 50,
                  example: "João da Silva",
                },
                email: {
                  type: "string",
                  format: "email",
                  description: "Email do cliente",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Cliente atualizado com sucesso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Cliente",
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
    delete: {
      tags: ["Clientes"],
      summary: "Remover um cliente",
      parameters: [
        {
          name: "cpf",
          in: "path",
          required: true,
          description: "CPF do cliente no formato XXX.XXX.XXX-XX",
          schema: {
            type: "string",
            pattern: "^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$",
          },
        },
      ],
      responses: {
        204: {
          description: "Cliente removido com sucesso",
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

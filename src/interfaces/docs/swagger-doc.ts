import clientesApi from "./paths/clientes.apidocs";

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: '49Burguer API',
    version: '1.0.0',
    description: 'API para gerenciamento de clientes, pedidos e cardápio',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
    },
  ],
  tags: [
    {
      name: 'Cadastro de Clientes',
      description: 'Endpoints relacionados aos clientes',
    },
  ],
  paths: 
    clientesApi,
  components: {
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          statusCode: { type: 'integer', example: 400 },
          error: { type: 'string', example: 'Bad Request' },
          message: { type: 'string', example: 'Erro ao cadastrar cliente' },
          path: { type: 'string', example: '/clientes' },
          timestamp: {
            type: 'string',
            format: 'date-time',
            example: '2025-04-17T12:30:00Z',
          },
          details: {
            type: 'array',
            items: { type: 'string' },
            example: [
              'O CPF já está cadastrado',
              'O nome deve ter pelo menos 3 caracteres',
            ],
          },
        },
      },
      Cliente: {
        type: 'object',
        properties: {
          nome: { type: 'string', example: 'João Silva' },
          cpf: { type: 'string', example: '123.456.789-00' },
          email: { type: 'string', example: 'email@email.com'}
        },
      }
    },
  },
};

export default swaggerDocument;

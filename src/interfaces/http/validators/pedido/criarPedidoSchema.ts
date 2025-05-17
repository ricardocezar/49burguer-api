import Joi from "joi";

export const criarPedidoSchema = Joi.object({
  cpf: Joi.string()
    .length(14)
    .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .optional()
    .messages({
      "string.base": "O CPF deve ser uma string",
      "string.empty": "O CPF não pode ser vazio",
      "string.length": "O CPF deve ter exatamente 14 caracteres",
      "string.pattern.name": "O CPF deve estar no formato XXX.XXX.XXX-XX",
    }),
  itens: Joi.array()
    .items(
      Joi.object({
        produtoId: Joi
          .number()
          .integer()
          .required()
          .messages({
            "number.base": "O ID do produto deve ser um número inteiro",
            "number.empty": "O ID do produto não pode ser vazio",
            "any.required": "O ID do produto é obrigatório",
          }),
        quantidade: Joi
          .number()
          .integer()
          .min(1)
          .required()
          .messages({
            "number.base": "A quantidade deve ser um número inteiro",
            "number.empty": "A quantidade não pode ser vazia",
            "number.min": "A quantidade deve ser maior que zero",
            "any.required": "A quantidade é obrigatória",
          }),
      })
    )
    .optional()
    .messages({
      "array.base": "Os itens devem ser um array",
      "array.empty": "Os itens não podem ser vazios",
    }),
  observacao: Joi.string().max(255).optional(),
});
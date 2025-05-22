import Joi from "joi";

export const alterarPedidoSchema = Joi.object({
  cliente: Joi.object({
    cpf: Joi.string()
      .length(14)
      .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      .optional()
      .example("123.456.789-00")
      .messages({
        "string.base": "O CPF deve ser uma string",
        "string.empty": "O CPF não pode ser vazio",
        "string.length": "O CPF deve ter exatamente 14 caracteres",
        "string.pattern.base": "O CPF deve estar no formato XXX.XXX.XXX-XX",
      }),
    identificarCliente: Joi.boolean().required(),
  }).optional(),
  itens: Joi.array()
    .items(
      Joi.object({
        produtoId: Joi
          .number()
          .integer()
          .required()
          .min(1)
          .max(999999999)
          .example(12)
          .messages({
            "number.base": "O ID do produto deve ser um número inteiro",
            "any.required": "O ID do produto é obrigatório",
            "number.empty": "O ID do produto não pode ser vazio",
            "number.min": "O ID do produto deve ser maior que zero",
            "number.max": "O ID do produto deve ser menor que 999999999",
          }),
        quantidade: Joi
          .number()
          .integer()
          .min(1)
          .max(30)
          .optional()
          .example(2)
          .when(Joi.object({ remover: Joi.boolean() }).equal(false), {
            then: Joi.required(),
          })
          .messages({
            "number.base": "A quantidade deve ser um número inteiro",
            "number.min": "A quantidade deve ser maior que zero",
            "number.max": "A quantidade deve ser menor que 30",
            "any.required": "A quantidade é obrigatória quando remover é falso",
          }),
        remover: Joi.boolean().optional(),
      }).or("quantidade", "remover")
      .messages({
        "object.missing": "Informe a quantidade ou o campo remover",
        "object.unknown": "Os campos quantidade e remover não podem ser usados juntos",
      })
    )
    .optional()
    .messages({
      "array.base": "Os itens devem ser um array",
    }),
  observacao: Joi.string().max(255).optional(),
});

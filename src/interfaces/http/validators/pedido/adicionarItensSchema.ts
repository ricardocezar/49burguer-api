import Joi from "joi";

export const adicionarItensSchema = Joi.object({
  itens: Joi.array()
    .items(
      Joi.object({
        produtoId: Joi.number()
          .integer()
          .required()
          .messages({
            "number.base": "O ID do produto deve ser um número inteiro",
            "any.required": "O ID do produto é obrigatório",
          }),
        quantidade: Joi.number()
          .integer()
          .min(1)
          .max(30)
          .required()
          .messages({
            "number.base": "A quantidade deve ser um número inteiro",
            "number.min": "A quantidade deve ser maior que zero",
            "number.max": "A quantidade deve ser menor ou igual a 30",
            "any.required": "A quantidade é obrigatória",
          }),
      })
    )
    .required()
    .messages({
      "array.base": "Itens deve ser um array",
      "any.required": "Itens é obrigatório",
    }),
});
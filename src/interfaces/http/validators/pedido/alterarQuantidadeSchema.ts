import Joi from "joi";

export const alterarQuantidadeSchema = Joi.object({
  quantidade: Joi.number()
    .integer()
    .min(1)
    .max(30)
    .required()
    .messages({
      "number.base": "A quantidade deve ser um número inteiro",
      "number.min": "A quantidade deve ser maior ou igual a 1",
      "number.max": "A quantidade deve ser menor ou igual a 30",
      "any.required": "A quantidade é obrigatória",
    }),
});

import Joi from "joi";

export const paramIdNumberSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "O ID deve ser um número",
    "number.integer": "O ID deve ser um número inteiro",
    "number.positive": "O ID deve ser um número positivo",
    "any.required": "O ID é obrigatório",
  }),
});

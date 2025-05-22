import Joi from "joi";

export const idPedidoEidProdutoParamSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv7" }).required().messages({
    "string.base": "O ID deve ser uma string",
    "string.guid": "O ID deve ser um UUID válido",
    "any.required": "O ID é obrigatório",
  }),
  produtoId: Joi.number().integer().positive().required().messages({
    "number.base": "O ID deve ser um número",
    "number.integer": "O ID deve ser um número inteiro",
    "number.positive": "O ID deve ser um número positivo",
    "any.required": "O ID é obrigatório",
  }),
});

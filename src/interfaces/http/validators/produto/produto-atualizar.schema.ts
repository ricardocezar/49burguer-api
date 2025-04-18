import Joi from "joi";

export const atualizarProdutoSchema = Joi.object({
  descricao: Joi.string().min(3).max(200).messages({
    "string.base": "A descrição deve ser uma string",
    "string.empty": "A descrição não pode ser vazia",
    "string.min": "A descrição deve ter pelo menos 3 caracteres",
    "string.max": "A descrição deve ter no máximo 200 caracteres",
  }),
  preco: Joi.number().greater(0).messages({
    "number.base": "O preço deve ser um número",
    "number.empty": "O preço não pode ser vazio",
    "number.greater": "O preço deve ser maior que 0",
  }),
  categoria: Joi.string().valid('LANCHE', 'ACOMPANHAMENTO', 'SOBREMESA', 'BEBIDA').messages({
    "string.base": "A categoria deve ser uma string",
    "string.empty": "A categoria não pode ser vazia",
    "any.only": "A categoria deve ser uma das seguintes: LANCHE, ACOMPANHAMENTO, SOBREMESA, BEBIDA",
  })
});
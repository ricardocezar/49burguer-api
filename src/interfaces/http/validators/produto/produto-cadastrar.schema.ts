import { EnumBody } from '@babel/types';
import Joi from "joi";

export const cadastrarProdutoSchema = Joi.object({
  descricao: Joi.string().required().min(3).max(200).messages({
    "string.base": "A descrição deve ser uma string",
    "string.empty": "A descrição não pode ser vazia",
    "string.min": "A descrição deve ter pelo menos 3 caracteres",
    "string.max": "A descrição deve ter no máximo 200 caracteres",
    "any.required": "A descrição é obrigatória",
  }),
  preco: Joi.number().required().greater(0).messages({
    "number.base": "O preço deve ser um número",
    "number.empty": "O preço não pode ser vazio",
    "any.required": "O preço é obrigatório",
    "number.greater": "O preço deve ser maior que 0",
  }),
  categoria: Joi.string().required().valid('LANCHE', 'ACOMPANHAMENTO', 'SOBREMESA', 'BEBIDA').insensitive().messages({
    "string.base": "A categoria deve ser uma string",
    "string.empty": "A categoria não pode ser vazia",
    "any.required": "A categoria é obrigatória",
    "any.only": "A categoria deve ser uma das seguintes: LANCHE, ACOMPANHAMENTO, SOBREMESA, BEBIDA",
  })
});
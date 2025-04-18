import Joi from 'joi';

export const listarClientesSchema = Joi.object({
  pagina: Joi.number().greater(0).integer().required().messages({
    'number.base': 'O query param pagina deve ser um número',
    'number.empty': 'O query param pagina não pode ser vazio',
    'any.required': 'O query param pagina é obrigatório',
    'number.integer': 'O query param pagina deve ser um número inteiro',
    'number.greater': 'O query param pagina deve ser maior que 0',
  }),
  quantidade: Joi.number().greater(0).integer().required().messages({
    'number.base': 'O query param quantidade deve ser um número',
    'number.empty': 'O query param quantidade não pode ser vazio',
    'any.required': 'O query param quantidade é obrigatório',
    'number.integer': 'O query param quantidade deve ser um número inteiro',
    'number.greater': 'O query param quantidade deve ser maior que 0',
  }),
});

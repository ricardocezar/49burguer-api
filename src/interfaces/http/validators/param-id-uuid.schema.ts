import Joi from "joi";

export const paramUuidSchema = Joi.object({
  id: Joi.string()
    .guid({ version: 'uuidv7' })
    .required()
    .messages({
      'string.base': 'O ID deve ser uma string',
      'string.guid': 'O ID deve ser um UUID válido',
      'any.required': 'O ID é obrigatório',
    }),
});

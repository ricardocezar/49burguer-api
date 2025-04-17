import Joi from "joi";

export const buscarClientePorCpfSchema = Joi.object({
  cpf: Joi.string()
    .length(14)
    .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .required()
    .messages({
      "string.base": "O CPF deve ser uma string",
      "string.empty": "O CPF não pode ser vazio",
      "string.length": "O CPF deve ter exatamente 11 caracteres",
      "any.required": "O CPF é obrigatório",
      "string.pattern.name": "O CPF deve estar no formato XXX.XXX.XXX-XX",
    }),
});

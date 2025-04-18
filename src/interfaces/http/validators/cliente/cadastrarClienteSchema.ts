import Joi from "joi";

export const cadastrarClienteSchema = Joi.object({
  nome: Joi.string().min(3).max(50).required().messages({
    "string.base": "O nome deve ser uma string",
    "string.empty": "O nome não pode ser vazio",
    "string.min": "O nome deve ter pelo menos 3 caracteres",
    "string.max": "O nome deve ter no máximo 50 caracteres",
    "any.required": "O nome é obrigatório",
  }),
  cpf: Joi.string()
    .length(14)
    .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .required()
    .messages({
      "string.base": "O CPF deve ser uma string",
      "string.empty": "O CPF não pode ser vazio",
      "string.length": "O CPF deve ter exatamente 14 caracteres",
      "any.required": "O CPF é obrigatório",
      "string.pattern.name": "O CPF deve estar no formato XXX.XXX.XXX-XX",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "O email deve ser uma string",
      "string.empty": "O email não pode ser vazio",
      "string.email": "O email deve ser um endereço de email válido",
      "any.required": "O email é obrigatório",
    }),
});

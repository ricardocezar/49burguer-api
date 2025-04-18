import Joi from "joi";

export const atualizarClienteSchema = Joi.object({
  nome: Joi.string().min(3).max(50).messages({
    "string.base": "O nome deve ser uma string",
    "string.empty": "O nome não pode ser vazio",
    "string.min": "O nome deve ter pelo menos 3 caracteres",
    "string.max": "O nome deve ter no máximo 50 caracteres",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.base": "O email deve ser uma string",
      "string.empty": "O email não pode ser vazio",
      "string.email": "O email deve ser um endereço de email válido",
    }),
});

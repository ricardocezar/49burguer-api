import Joi from "joi";

export const listarPedidosPorStatusEDataSchema = Joi.object({
  status: Joi.string()
    .valid("CRIADO", "RECEBIDO", "EM_PREPARACAO", "PRONTO", "FINALIZADO", "CANCELADO")
    .optional()
    .messages({
      "any.only": "Status deve ser um dos valores permitidos: CRIADO, RECEBIDO, EM_PREPARACAO, PRONTO, FINALIZADO, CANCELADO",
      "string.base": "Status deve ser uma string",
    }),
  dataInicio: Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .optional()
    .messages({
      "string.pattern.base": "Data inicial deve estar no formato DD-MM-YYYY",
      "string.base": "Data inicial deve ser uma string",
    }),
  dataFim: Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .optional()
    .messages({
      "string.pattern.base": "Data final deve estar no formato DD-MM-YYYY",
      "string.base": "Data final deve ser uma string",
    }),
}).or("status", "dataInicio").messages({
  "object.missing": "Informe o status ou a data inicial",
  "object.unknown": "Os campos status e data inicial não podem ser usados juntos",
});

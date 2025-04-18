import Joi from "joi";

export const categoriaSchema = Joi.object({
  categoria: Joi.string()
    .valid("LANCHE", "ACOMPANHAMENTO", "SOBREMESA", "BEBIDA")
    .required()
    .messages({
      "string.base": "A categoria deve ser uma string",
      "string.empty": "A categoria não pode ser vazia",
      "any.required": "A categoria é obrigatória",
      "any.only":
        "A categoria deve ser uma das seguintes: LANCHE, ACOMPANHAMENTO, SOBREMESA, BEBIDA",
    }),
});
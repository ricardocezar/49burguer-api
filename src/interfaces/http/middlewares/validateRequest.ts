import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { ErrorResponse } from "../dtos/ErrorResponse";

export function validateBody(schema: ObjectSchema): any {
  return validate(schema, 'body');
}

export function validateParams(schema: ObjectSchema): any {
  return validate(schema, 'params');
}

export function validateQuery(schema: ObjectSchema): any {
  return validate(schema, 'query');
}

function validate(schema: ObjectSchema, property: 'body' | 'params' | 'query'): any {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    if (error) {
      const errorResponse: ErrorResponse = {
        statusCode: 400,
        error: "Bad Request",
        message: "Erro de validação",
        details: error.details.map((detail) => detail.message),
        path: req.originalUrl,
        timestamp: new Date().toISOString(),
      };
      return res.status(errorResponse.statusCode).json(errorResponse);
    }
    next();
  };
}

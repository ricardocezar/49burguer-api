import { ClienteJaCadastradoException } from "@/domain/errors/ClienteJaCadastradoException";
import { CpfInvalidoException } from "@/domain/errors/CpfInvalidoException";
import { ErrorRequestHandler } from "express";
import { ErrorResponse } from "../dtos/ErrorResponse";
import { ClienteNaoEncontradoException } from "@/domain/errors/ClienteNaoEncontradoException";
import { CategoriaInvalidaException } from "@/domain/errors/CategoriaInvalidaException";
import { Preco } from "@/domain/entities/produto/Preco";
import { PrecoInvalidoException } from "@/domain/errors/PrecoInvalidoException";
import { ProdutoNaoEncontrado } from "@/domain/errors/ProdutoNaoEncontrado";

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: any,
  res: any,
  next: any
) => {
  const buildErrorResponse = (
    statusCode: number,
    error: string,
    message: string,
    details?: string[]
  ): ErrorResponse => ({
    statusCode,
    error,
    message,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    details: details || [],
  });

  if (err instanceof ClienteJaCadastradoException) {
    const response = buildErrorResponse(409, "Conflict", err.message, [
      err.message,
    ]);
    return res.status(409).json(response);
  }

  if (err instanceof CpfInvalidoException) {
    const response = buildErrorResponse(400, "Bad Request", err.message, [
      err.message,
    ]);
    return res.status(400).json(response);
  }

  if (err instanceof ClienteNaoEncontradoException) {
    const response = buildErrorResponse(404, "Not Found", err.message, [
      err.message,
    ]);
    return res.status(404).json(response);
  }

  if (err instanceof CategoriaInvalidaException) {
    const response = buildErrorResponse(400, "Bad Request", err.message, [
      err.message,
    ]);
    return res.status(400).json(response);
  }

  if (err instanceof PrecoInvalidoException) {
    const response = buildErrorResponse(400, "Bad Request", err.message, [
      err.message,
    ]);
    return res.status(400).json(response);
  }

  if (err instanceof ProdutoNaoEncontrado) {
    const response = buildErrorResponse(404, "Not Found", err.message, [
      err.message,
    ]);
    return res.status(404).json(response);
  }

  console.error(err);
  const response = buildErrorResponse(
    500,
    "Internal Server Error",
    "Erro interno do servidor"
  );
  return res.status(500).json(response);
};

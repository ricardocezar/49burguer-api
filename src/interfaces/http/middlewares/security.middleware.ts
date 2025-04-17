import { Router } from "express"
import helmet from "helmet"
import rateLimit from 'express-rate-limit'

export const securityMiddleware = (): Router => {
  const router = Router()

  router.use(helmet())

  router.use(
    rateLimit({
      windowMs: 5 * 60 * 1000, // 5 minutos
      max: 100, // limite de 100 requisições por IP
      standardHeaders: true,
      legacyHeaders: false,
    })
  )

  return router;
}

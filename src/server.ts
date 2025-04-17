import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import swaggerConfig from "./interfaces/docs/swagger";
import clienteRoutes from './interfaces/http/routes/cliente.routes';
import { errorHandler } from "./interfaces/http/middlewares/errorHandler";
import { securityMiddleware } from "./interfaces/http/middlewares/security.middleware";
require('module-alias/register');

// Configurações
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middlewares básicos
app.use(express.json());
app.use(securityMiddleware());
swaggerConfig(app);

app.use('/clientes', clienteRoutes);

app.use(errorHandler); //nao tira esse caraio daqui
app.listen(port, () => console.log(`Server rodando na porta ${port}`));

export default app;

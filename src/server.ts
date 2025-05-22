import express from "express";
import dotenv from "dotenv";
import swaggerConfig from "./interfaces/docs/swagger";
import { errorHandler } from "./interfaces/http/middlewares/errorHandler";
import { securityMiddleware } from "./interfaces/http/middlewares/security.middleware";
import routes from "./interfaces/http/routes/index.routes"; // Adjust the path as needed
require('module-alias/register');

// Configurações
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middlewares básicos
app.use(express.json());
app.use(securityMiddleware());
swaggerConfig(app);

app.use('/api', routes);

app.use(errorHandler);
app.listen(port, () => console.log(`Server rodando na porta ${port}`));

export default app;

import clienteRoutes from './cliente.routes';
import { Router } from "express";

const rotas: Router = Router();

rotas.use('/v1/clientes', clienteRoutes);

export default rotas;
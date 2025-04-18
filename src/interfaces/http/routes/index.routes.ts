import clienteRoutes from './cliente.routes';
import { Router } from "express";
import produtoRotas from './produto.router';

const rotas: Router = Router();

rotas.use('/v1/clientes', clienteRoutes);
rotas.use('/v1/produtos', produtoRotas);

export default rotas;
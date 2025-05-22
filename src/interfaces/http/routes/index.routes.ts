import clienteRoutes from './cliente.routes';
import { Router } from "express";
import produtoRotas from './produto.routes';
import pedidoRotas from './pedido.routes';

const rotas: Router = Router();

rotas.use('/v1/clientes', clienteRoutes);
rotas.use('/v1/produtos', produtoRotas);
rotas.use('/v1/pedidos', pedidoRotas);

export default rotas;
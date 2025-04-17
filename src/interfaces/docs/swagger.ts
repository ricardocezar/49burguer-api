import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-doc';

export default (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

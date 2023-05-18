import CatRoute from './router/cat.route.js';
import { ConnectDB } from './config/connect.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import postRouter from './routes/posts.routes';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './config/swagger.js';
import swaggerUi from 'swagger-ui-express';

/* port */
dotenv.config();
const port = process.env.PORT || 3000;

/* config */
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(morgan('common'));

/* swagger */
const openapiSpecification = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

/* routes */
app.use('/api/v1/', postRouter);

/* db */
ConnectDB();

/* router */

app.use('/api/Categories', CatRoute);

/* server */
app.listen(port, () => {
  console.log('Port is running at: ' + port);
});
export const viteNodeApp = app;

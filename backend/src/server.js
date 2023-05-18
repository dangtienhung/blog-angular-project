import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import postRouter from './routes/posts.routes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

/* config */
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(morgan('common'));

/* swagger */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Angular Blog API with Express',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api/v1`,
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js', './src/controllers/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

/* routes */
app.use('/api/v1/', postRouter);

/* db */
mongoose
  .connect('mongodb://127.0.0.1:27017/angular_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch(() => console.log('DB connection error'));

/* server */
export const viteNodeApp = app;

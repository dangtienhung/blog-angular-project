import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { ConnectDB } from './config/connect.js';
import morgan from 'morgan';
import CatRoute from './router/cat.route.js';

/* port */
dotenv.config();
const port = process.env.PORT || 3000;

/* config */
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(morgan('dev'));
/* routes */

/* db */
ConnectDB();

/* router */

app.use('/api/Categories', CatRoute);

/* server */
app.listen(port, () => {
  console.log('Port is running at: ' + port);
});
export const viteNodeApp = app;

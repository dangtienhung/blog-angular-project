import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

/* config */
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(morgan('dev'));
/* routes */

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

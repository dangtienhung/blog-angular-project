import CatRoute from './routes/cat.route.js';
import { ConnectDB } from './config/connect.js';
import { Server } from 'socket.io';
import UploadFileRouter from './routes/uploadfile.routes.js';
import YAML from 'yamljs';
import authRouter from './routes/auth.routes.js';
import { authors } from './middleware/author.js';
import commentRouter from './routes/comment.route.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import hashTagRouter from './routes/hashtag.route.js';
import morgan from 'morgan';
import postRouter from './routes/posts.routes.js';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './config/swagger.js';
import swaggerUi from 'swagger-ui-express';
import tagRouter from './routes/tag.route.js';
import uploadRouter from './routes/upload.routes.js';
import userRouter from './routes/users.routes.js';

// import commentRouter from './routes/comments.routes.js';

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
// const openapiSpecification = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
const swaggerdocUI = YAML.load('./api.yaml'); //ong chay swagger ui cua ong thi comment dong nay nhe! (npm i yamljs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerdocUI));

/* routes */
app.use('/api/v1/posts', postRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1', uploadRouter);

/* db */
ConnectDB();

/* router category*/
app.use('/api/v1', CatRoute);

/* router category*/
app.use('/api/v1/comments', commentRouter);

/* router tag*/
app.use('/api/v1/tag', tagRouter);

/* router hashtag*/
app.use('/api/v1/hashtag', hashTagRouter);

/* router uploadfile*/
app.use('/api/v1/', UploadFileRouter);

/* server */
const server = app.listen(port, () => {
  console.log('Port is running at: ' + port);
});
// export const viteNodeApp = app;

/* socket */
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${port}`,
    methods: ['GET', 'POST'],
    creadentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('Made socket connection');
  socket.on('comment', (data) => {
    console.log('🚀 ~ file: server.js:83 ~ socket.on ~ data:', data);
    io.emit('comment', data);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

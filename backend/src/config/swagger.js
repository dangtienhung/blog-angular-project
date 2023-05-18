import * as dotenv from 'dotenv';

dotenv.config();

export const swaggerOptions = {
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

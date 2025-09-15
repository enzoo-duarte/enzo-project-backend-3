import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

dotenv.config(); 

//Routers
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();

const { PORT, JWT_SECRET, MONGO_URI } = process.env;
console.log(PORT, JWT_SECRET);

//MongoDB conexión
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'API del poder y del saber',
            description: 'Documentación de la API pensada para la clase de Swagger'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

const specs = swaggerJsDoc(swaggerOptions);

app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(specs));
// Rutas
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

export default app;

import express from "express";
import cookieParser from 'cookie-parser';
const { v4: uuidv4 } = require('uuid');

import asyncLocalStorage from '../storage/async-storage';
import todoRoutes from '../../modules/todo/todo.route';
import authRoutes from '../../modules/auth/auth.route';
import logger from '../logger/logger';
import { errorHandler } from '../../middlewares/error-handler';

const app = express();

app.use((req, res, next) => {
    const traceId = req.headers['x-request-id'] as string || uuidv4();
    asyncLocalStorage.run(new Map(), () => {
        logger.init(traceId)
        next();
    })
});

app.use(express.json());
app.use(cookieParser());

app.use(todoRoutes);
app.use(authRoutes);

app.use(errorHandler);

export default app;

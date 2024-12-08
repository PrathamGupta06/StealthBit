import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import clientRouter from './routes/client.js';
import malwareRouter from './routes/malware.js';
import fulfillmentRouter from './routes/fulfillment.js';
import victimRouter from './routes/victim.js';

import { connectDB } from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import logger from './utils/logger.js';

dotenv.config();
const PORT = process.env.PORT || process.env.BACKEND_PORT || 3001;
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
app.use('/api/client', clientRouter);
app.use('/api/mw', malwareRouter);
app.use('/api/fulfill', fulfillmentRouter);
app.use('/api/victim', victimRouter);

// Health check route
app.get('/health', (req, res) => {
    res.send('OK');
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

export default app;


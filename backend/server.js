import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';   

const app = express();

app.get ('/api', (req, res) => {
    res.send('server is ready');

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
// get a list of 5 jokes


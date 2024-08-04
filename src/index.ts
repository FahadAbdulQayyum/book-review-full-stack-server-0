// // url for this server: https://



import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';

import Routes from './routes';
import { connectDB } from './config/db';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware before other middleware and routes
app.use(cors({
    // origin: 'https://book-review-platform-gold.vercel.app', // Replace with your front-end URL
    // origin: 'http://localhost:5173', // Replace with your front-end URL
    origin: '*', // Replace with your front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api", Routes);

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

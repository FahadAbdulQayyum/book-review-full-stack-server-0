"use strict";
// // url for this server: https://book-review-platform-server.vercel.app
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Use CORS middleware before other middleware and routes
app.use((0, cors_1.default)({
    // origin: 'https://book-review-platform-gold.vercel.app', // Replace with your front-end URL
    // origin: 'http://localhost:5173', // Replace with your front-end URL
    origin: '*', // Replace with your front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, db_1.connectDB)();
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

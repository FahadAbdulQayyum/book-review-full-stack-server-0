import express from "express";
const router = express.Router();
import { getLoggedIn, login } from "../controller/auth";

router
.get('/', getLoggedIn)
.post('/', login)


export default router;
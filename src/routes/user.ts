import express from "express";
const router = express.Router();
import {register} from "../controller/user"
router.post('/', register)


export default router;
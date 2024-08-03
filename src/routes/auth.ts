import express, { Express, Request, Response } from "express";
const router = express.Router();
// import {getMyProfile, Login, register, Register, UpdateProfile} from "../controller/user"
import { getLoggedIn, login } from "../controller/auth";
// import { isAuthenticated } from "../middlewares/auth";

// router.get('/auth',isAuthenticated, getMyProfile)
// router.post('/login', Login)
// router.post('/signup', Register)
// router.put('/update/:id', isAuthenticated, UpdateProfile)
router
.get('/', getLoggedIn)
.post('/', login)


export default router;
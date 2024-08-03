"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// import {getMyProfile, Login, register, Register, UpdateProfile} from "../controller/user"
const auth_1 = require("../controller/auth");
// import { isAuthenticated } from "../middlewares/auth";
// router.get('/auth',isAuthenticated, getMyProfile)
// router.post('/login', Login)
// router.post('/signup', Register)
// router.put('/update/:id', isAuthenticated, UpdateProfile)
router
    .get('/', auth_1.getLoggedIn)
    .post('/', auth_1.login);
exports.default = router;

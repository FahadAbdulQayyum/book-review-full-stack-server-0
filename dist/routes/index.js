"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import userRouter from './user'
// import reviewRouter from './book'
// import { getLoggedIn, login } from "../controller/auth";
// import { register } from "../controller/user";
// import { addBook, deleteBook, getBooks, updateBook } from "../controller/books";
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const book_1 = __importDefault(require("./book"));
const router = express_1.default.Router();
// router.use('/user', userRouter)
// router.use('/review', reviewRouter)
router.use('/auth', auth_1.default);
// router.use('/auth', getLoggedIn, login)
router.use('/users', user_1.default);
// router.use('/users', register)
router.use('/books', book_1.default);
// router.use('/books', getBooks, addBook, updateBook, deleteBook)
exports.default = router;

import express from "express"
// import userRouter from './user'
// import reviewRouter from './book'
// import { getLoggedIn, login } from "../controller/auth";
// import { register } from "../controller/user";
// import { addBook, deleteBook, getBooks, updateBook } from "../controller/books";
import auth from "./auth"
import user from "./user"
import book from "./book"
const router = express.Router();

// router.use('/user', userRouter)
// router.use('/review', reviewRouter)
router.use('/auth', auth)
// router.use('/auth', getLoggedIn, login)
router.use('/users', user)
// router.use('/users', register)
router.use('/books', book)
// router.use('/books', getBooks, addBook, updateBook, deleteBook)

export default router;
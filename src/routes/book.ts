import express, { Express, Request, Response } from "express";
import { addBook, deleteBook, getBooks, updateBook } from "../controller/books";
import auth from "../middlewares/auth";
const router = express.Router();
// import {AddReview, UpdateReview, GetMyReviews, GetAllReviews, DeleteReview} from "../controller/books"
// import { isAuthenticated } from "../middlewares/auth";

router.get('/', getBooks)
.post('/', addBook)
.put('/:id', auth, updateBook)
.delete('/:id', auth, deleteBook)


export default router;
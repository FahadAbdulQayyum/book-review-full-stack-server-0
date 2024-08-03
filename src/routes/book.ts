import express from "express";
import { addBook, deleteBook, getBooks, updateBook } from "../controller/books";
import auth from "../middlewares/auth";
const router = express.Router();

router.get('/', getBooks)
.post('/', addBook)
.put('/:id', auth, updateBook)
.delete('/:id', auth, deleteBook)


export default router;
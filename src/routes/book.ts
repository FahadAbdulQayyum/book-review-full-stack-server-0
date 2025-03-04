import express from "express";
import { addBook, addReview, deleteBook, fetchReviewsData, getAllBooks, getBooks, updateBook } from "../controller/books";
import auth from "../middlewares/auth";
const router = express.Router();

router.get('/fetchReviewsData', fetchReviewsData )
router.get('/', getBooks)
.post('/', addBook)
.post('/review/:id', auth, addReview)
.put('/:id', auth, updateBook)
.delete('/:id', auth, deleteBook)
router.get('/all', getAllBooks)


export default router;
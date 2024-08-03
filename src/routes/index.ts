import express from "express"
import auth from "./auth"
import user from "./user"
import book from "./book"
const router = express.Router();

router.use('/auth', auth)
router.use('/users', user)
router.use('/books', book)

export default router;
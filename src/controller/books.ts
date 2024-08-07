import express, { Request, Response, NextFunction } from "express";
// @ts-ignore
import Book from "../models/Book";
// import Book from "@models/Book";
import auth from "../middlewares/auth";
import {check, validationResult} from "express-validator";
import User, { IUser } from "../models/User";


const router = express.Router();


// @routes GET api/books/all
// @desc Get all the books    
// @access Public


export const getAllBooks = async (req: Request, res: Response)=> {
    try {
        // const books = await Book.find({user: req.rawTrailers[0]}).sort({
        //     date: -1
        // });
        const books = await Book.find({}).sort({
            date: -1
        });

        res.json(books)
    } catch (err: any) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
    
}


// @routes GET api/books
// @desc Get all the user's books    
// @access Private

export const getBooks = router.get('/', auth ,async (req: Request, res: Response)=> {
    try {
        const books = await Book.find({user: req.rawTrailers[0]}).sort({
            date: -1
        });

        res.json(books)
    } catch (err: any) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

    
})

// @routes POST api/books
// @desc Add a new book    
// @access Private

export const addBook = router.post('/', auth, [
    check('title', 'Please enter the book title').not().isEmpty(),
    check('author', 'Please enter the book author').not().isEmpty(),
    check('publicationYear', 'Please enter the book\'s publication year').not().isEmpty(),
    check('genre', 'Please enter the book\'s genre').not().isEmpty(),
    check('bookReviewText', 'Please enter the book\'s review').not().isEmpty(),
    check('rating', 'Please enter the book\'s rating').not().isEmpty(),
], async(req: Request, res: Response)=> {
    const errors = validationResult(req);    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const { title, author, publicationYear, genre, bookReviewText, rating } = req.body;
    
    try {
    const newBook = new Book({
        title,
        author,
        publicationYear,
        genre,
        bookReviewText,
        rating,
        user: req.rawTrailers[0]
    })

    const book = await newBook.save();

    res.json(book);

    
} catch (err: any) {
    console.error(err.message)
    res.status(500).send('Server Error')
}
})

export const addReview = async(req: Request, res: Response)=> {

    const {id} = req.params;

console.log('req...', req, req.body, req.rawTrailers[0])

    const { review } = req.body;
    
    try {
    const user = await User.findById({_id:req.rawTrailers[0]})
    if(!user){
        return res.status(400).json({success:false, msg: 'User not found'})
    }

    // const alreadyReviewed = user.reviews.find(v=>v.bookId===id)

    // console.log('alreadyRevieweded....', alreadyReviewed)
    // if(alreadyReviewed){
    //     user.reviews.filter(v=>v.bookId!==id)
    //     user.save();
    //     user.reviews.push({bookId: id, like: !review})
    // }else{
    //     user.reviews.push({bookId: id, like: review})
    // }


    // Find the index of the existing review
    const existingReviewIndex = user.reviews.findIndex(v => v.bookId === id);
    const existingReview = user.reviews.find(v => v.bookId === id);

    if (existingReviewIndex !== -1) {
        // Update the existing review
        user.reviews[existingReviewIndex].like = existingReview!==undefined && !existingReview.like;
    } else {
        // Add a new review
        user.reviews.push({ bookId: id, like: review });
    }

    // Save the updated user document
    await user.save();


    user.save();

    res.json(user);
    
} catch (err: any) {
    console.error(err.message)
    res.status(500).send('Server Error')
}
}

// Function to fetch and process reviews data
export const fetchReviewsData = async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find({});
        const reviewStats: { [key: string]: { bookId: string, totalLikes: number, totalDislikes: number } } = {};

        users.forEach(user => {
            user.reviews.forEach(review => {
                if (!reviewStats[review.bookId]) {
                    reviewStats[review.bookId] = {
                        bookId: review.bookId,
                        totalLikes: 0,
                        totalDislikes: 0
                    };
                }
                if (review.like) {
                    reviewStats[review.bookId].totalLikes++;
                } else {
                    reviewStats[review.bookId].totalDislikes++;
                }
            });
        });

        // return Object.values(reviewStats);
        res.json({data:Object.values(reviewStats)});
    } catch (err) {
        console.error(err);
        throw new Error('Error fetching reviews data');
    }
};

// @routes PUT api/books/:id
// @desc Update a book
// @access Private

interface BookProps {
    title: string,
    author: string,
    publicationYear: number,
    genre: string,
    bookReviewText: string,
    rating: number,
}

export const updateBook = async (req: Request, res: Response)=> {
    const {title, author, publicationYear, genre, bookReviewText, rating} = req.body
    console.log('req....body', req)
    const bookFields: BookProps = {
        title:'',
        author: '',
        publicationYear: 0,
        genre: 'fictional',
        bookReviewText: '',
        rating: 0,
    }
    if(title) bookFields.title = title
    if(author) bookFields.author = author
    if(publicationYear) bookFields.publicationYear = publicationYear
    if(genre) bookFields.genre = genre
    if(bookReviewText) bookFields.bookReviewText = bookReviewText
    if(rating) bookFields.rating = rating

    try {
        let book = await Book.findById(req.params.id)
        if(!book) return res.status(404).json({msg: 'This contact does not exist'})
        if(book.user.toString() !== req.rawTrailers[0]) return res.status(403).json({msg: 'Not authorized to update this contact'})
        
        book = await Book.findByIdAndUpdate(req.params.id, 
            {$set: bookFields},
            {new: true}
        )

        res.json(book);

    } catch (err: any) {
        res.status(500).send('Server Error');
        console.error(err.message);
    }

}


// @routes DELETE api/books/:id
// @desc Delete a book
// @access Private

export const deleteBook = async (req: Request, res: Response)=> {

    try {
        await Book.findByIdAndDelete(req.params.id)
        return res.status(200).json({success: true, msg:'Book deleted successfully'})
    } catch (err) {
        res.status(500).send('Server Error')
        console.error(err)
    }
    
}
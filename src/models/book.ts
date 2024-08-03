import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IBook extends Document {
    _id: ObjectId;
    user: mongoose.Types.ObjectId;
    title: string;
    author: string;
    publicationYear: number;
    genre: string;
    bookReviewText: string;
    rating: number;
    createdAt: Date;
}

const BookSchema: Schema = new Schema({
    user: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        required: true,
        type: String,
    },
    publicationYear: {
        required: true,
        type: Number,
    },
    genre: {
        required: true,
        type: String,
    },
    bookReviewText: {
        required: true,
        type: String,
    },
    rating: {
        required: true,
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const Book = mongoose.model<IBook>("Book", BookSchema);
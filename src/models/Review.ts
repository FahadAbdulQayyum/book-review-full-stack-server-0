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
    bookId: {
        type: String,
        required: true,
    },
    opinion: {
        required: true,
        type: String,
    }
})

export default mongoose.model<IBook>("Review", BookSchema);
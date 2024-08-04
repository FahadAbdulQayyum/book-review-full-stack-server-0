import mongoose, { Schema, Document} from 'mongoose';

interface Reviews {
    bookId: string,
    like: boolean
}

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    reviews: Reviews[];
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    reviews: [{
        // type: [{ type: mongoose.Types.ObjectId, ref: 'Book' }],
        bookId: String,
        like: Boolean
    }]
});

export default mongoose.model<IUser>("User", UserSchema);
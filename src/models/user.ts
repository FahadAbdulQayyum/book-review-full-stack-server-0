import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
    // _id: ObjectId;
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
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
        // select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const User = mongoose.model<IUser>("User", UserSchema);
import mongoose, { Schema, Document} from 'mongoose';

export interface IUser extends Document {
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
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const User = mongoose.model<IUser>("User", UserSchema);
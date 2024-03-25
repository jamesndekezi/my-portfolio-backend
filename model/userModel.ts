import mongoose from 'mongoose';
import { TodoDocument } from './todoModel';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
    }]
});

interface UserI {
    username: string;
    email: string;
    password: string;
    todos: TodoDocument[];
    isAdmin: boolean;
}

export interface UserDocument extends UserI, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;

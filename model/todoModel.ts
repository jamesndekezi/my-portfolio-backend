import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

interface TodoSchema {
    title: string;
    completed: boolean;
    description: string;
    owner: mongoose.Types.ObjectId;
}

export interface TodoDocument extends TodoSchema, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const Todo = mongoose.model<TodoDocument>("Todo", todoSchema);

export default Todo;

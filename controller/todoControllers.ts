import { Request, Response } from "express";
import Todo from "../model/todoModel";
import { UserDocument } from "../model/userModel";


export const getAllTodo = async(req:Request,res:Response)=>{

    try {
        const result = await Todo.find()
       res.status(200).json({
        status:200,
        message:"success",
        data:result
       })
    } catch (error:any) {
        res.status(500).json({
            status:500,
            message:"failure"
        })
    }

}


export const addTodo = async (req: any, res: Response) => {
    try {
        const currentUser: UserDocument = req.currentUser;

        
        const newTodo = await Todo.create({
            ...req.body,
            owner: currentUser._id 
        });

        currentUser.todos.push(newTodo._id);
        await currentUser.save();

        res.status(201).json({
            status: 200,
            message: "success",
            data: newTodo
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};


export const markTodoAsCompleteOrIncomplete = async(req:Request,res:Response)=>{
    try {

        const {id} = req.params
        const currentTodo = await Todo.findById(id)

        if(currentTodo){
            const updatedTodo = await Todo.findByIdAndUpdate(id,{
                completed:!currentTodo.completed
            },{new: true})

            res.status(200).json({
                status:200,
                message:"success",
                data:updatedTodo
            })
        } else {
            res.status(404).json({
                status:404,
                message:"Todo not found"
            })
        }

    } catch (error:any) {
        console.error('Error toggling todo status:', error.message);
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}

export const deleteTodo = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const currentTodo = await Todo.findById(id);

        if (currentTodo) {

            await Todo.findByIdAndDelete(id);

            res.status(200).json({
                status: 200,
                message: "Todo deleted successfully"
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "Todo not found"
            });
        }
    } catch (error:any) {
        console.error('Error deleting todo:', error.message);
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
};


export const editTodo = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;

        const currentTodo = await Todo.findById(id)
        
        if (currentTodo) {

            const updatedTodo = await Todo.findByIdAndUpdate(id, {...req.body}, { new: true });

            res.status(200).json({
                status: 200,
                message: "Todo updated successfully",
                data: updatedTodo
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "Todo not found"
            });
        }
    } catch (error:any) {
        console.error('Error updating todo:', error.message);
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
};

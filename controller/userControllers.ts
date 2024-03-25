import { Request, Response} from "express"
import User from "../model/userModel"
import * as jwtService from "../services/jwt.service"

//functin to get all user from db
export const getAllUsers = async(req: Request, res: Response) => {
    try {
        const allUsers = await User.find().populate("todos")

        const count = allUsers.length

        if( allUsers.length >0 ){
            res.status(200).json({
                status:200,
                message:"success",
                count,
                data:allUsers
            })
        } else {
            res.status(404).json({
                status:404,
                message:"no users found",
            })
        }

    } catch (error:any) {

        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error:error.message
        })
        
    }
}


//function to register new user
export const registerUser = async(req:Request,res:Response)=>{
    try {
        const newUser = await User.create({...req.body})
        res.status(201).json({
            status:201,
            message:"User created successfully",
            data:newUser
        })
    } catch (error:any) {
        
        res.status(500).json({
            status:500,
            message:"Internal server error",
            error:error.message
        })
    }
}

//function to login user
export const loginUser = async (req: any, res: Response) => {
    try {
        const user = await User.findOne({ $or: [{ email: req.body.username }, { username: req.body.username }] }).populate("todos");

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        console.log("User with populated todos:", user); // Log the user object with populated todos

        if (user && user.password === req.body.password) {
            // Assuming jwtService.generateUserToken(user) generates a token based on the user
            const token = await jwtService.generateUserToken(user);

            res.status(200).json({
                status: 200,
                message: "Success",
                data: user,
                token
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "Invalid password"
            });
        }

    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};


//function to update user

export const updateUser = async(req:Request, res:Response) =>{

    try {
        const user = await User.findById(req.params.id)

        if(user){
            const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate("todos")

            res.status(200).json({
                status:200,
                message:"User updated successfully",
                data:updatedUser
            })
        } else {
            res.status(404).json({
                status:404,
                message:"User not found"
            })
        }
    } catch (error:any) {

        res.status(500).json({
            status:500,
            message:"Internal server error",
            error:error.message
        })
        
    }

}


//function to delete user

export const deleteUser = async(req:Request, res:Response) =>{

    try {
        const user = await User.findById(req.params.id)

        if(user){
            const deletedUser = await User.findByIdAndDelete(req.params.id)

            res.status(200).json({
                status:200,
                message:"User deleted successfully",
                data:deletedUser
            })
        } else {
            res.status(404).json({
                status:404,
                message:"User not found"
            })
        }
    } catch (error:any) {

        res.status(500).json({
            status:500,
            message:"Internal server error",
            error:error.message
        })
        
    }

}


//function to update user

export const getSingleUser = async(req:Request,res:Response)=>{
    try {
        const user = await User.findById(req.params.id).populate("todos")

        if(user){
            res.status(200).json({
                status:200,
                message:"success",
                data:user
            })
        } else {
            res.status(404).json({
                status:404,
                message:"User not found"
            })
        }
    } catch (error:any) {

        res.status(500).json({
            status:500,
            message:"Internal server error",
            error:error.message
        })
        
    }
}
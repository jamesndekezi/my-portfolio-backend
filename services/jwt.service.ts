import jwt from "jsonwebtoken"
import User, { UserDocument } from "../model/userModel"


export const generateUserToken =(user:UserDocument)=>{
    try {
        const token = jwt.sign({userId:user._id},"session",{expiresIn:"30d"})

        return token

    } catch (error:any) {
        throw new Error(error.message)
    }
}


export const decodeUserToken = async(token:string)=>{
    try {
        const decoded = jwt.verify(token,"session") as {userId:string}

        const associatedUser:UserDocument | null = await User.findById(decoded.userId)

        if(associatedUser){
            return associatedUser
        } else {
            throw new Error("User not found or token expired")
        }


    } catch (error:any) {
        throw new Error(error.message)
    }
}
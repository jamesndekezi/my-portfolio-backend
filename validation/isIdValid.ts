import { NextFunction, Request, Response } from "express";



const isIdValidatd = async(req:Request,res:Response,next:NextFunction)=>{

    try {

        const {id} = req.params

        if(id.length >24 || id.length <24){
            return res.status(400).json({
                status: 400,
                message: "Invalid id"
            })

        } else {
            next()
        }
        
    } catch (error) {

        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
        
    }

}


export default isIdValidatd
import { NextFunction, Request, Response } from "express";

import * as jwtService from "../services/jwt.service"


const isLoggedIn = async(req:any,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(400).json({ error: "No token provided 👎" });
    }
    try {
        const user = await jwtService.decodeUserToken(token)
        if (!user) {
            return res.status(401).json({ error: "Invalid token or user not found" });
        }
        req.currentUser = user; 
        next();
    } catch (error:any) {
        return res.status(401).json({ error: error.message });
    }
}


export default isLoggedIn
import { Router } from "express";
import { deleteUser, getAllUsers, getSingleUser, loginUser, registerUser, updateUser } from "../controller/userControllers";
import isLoggedIn from "../middlewares/isAuthenticated";


const userRoutes = Router()

userRoutes.get("/",getAllUsers),
userRoutes.get("/:id", isLoggedIn ,getSingleUser),
userRoutes.post("/auth/register",registerUser),
userRoutes.post("/auth/login",loginUser),
userRoutes.put("/:id" , isLoggedIn , updateUser),
userRoutes.post("/:id", isLoggedIn , deleteUser)


export default userRoutes



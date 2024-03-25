import { Router } from "express";
import { addTodo, deleteTodo, editTodo, getAllTodo, markTodoAsCompleteOrIncomplete } from "../controller/todoControllers";
import isIdValidatd from "../validation/isIdValid";
import isLoggedIn from "../middlewares/isAuthenticated";


const todoRoutes = Router()

todoRoutes.get("/",getAllTodo)
todoRoutes.post("/", isLoggedIn , addTodo)

todoRoutes.put("/:id/complete", isIdValidatd, isLoggedIn , markTodoAsCompleteOrIncomplete)

todoRoutes.delete("/:id", isIdValidatd,isLoggedIn,deleteTodo)
todoRoutes.put("/:id", isIdValidatd , isLoggedIn ,editTodo)


export default todoRoutes
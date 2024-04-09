
import express, { Router } from 'express';
import userRoutes from './userRoutes';
import blogRoutes from './blogRoutes';
import messageRoute from './messageRoutes';


const appRoutes: Router = express.Router();

appRoutes.use("/users", userRoutes)
appRoutes.use("/blogs", blogRoutes)
appRoutes.use("/messages", messageRoute)



export default appRoutes;
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
import todoRoutes from "./routes/todoRoutes";
import userRoutes from "./routes/userRoutes";

const app = express()



app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"api is working properly"
    })
})

app.use("/api/v1/todos",todoRoutes)
app.use("/api/v1/users",userRoutes)


mongoose.connect(`${process.env.MONGODB_URL}`).then(()=>{
    app.listen(3000, () => {
        console.log("Server is running on port 3000 and connected to db")
    })
}).catch((error:any)=>console.log(error.messge))




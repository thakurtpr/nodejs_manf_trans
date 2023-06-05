import express from "express";
import userRouter from "./routes/user.js";
import messageRouter from "./routes/message.js"
import { config } from "dotenv";
export const app = express();
import cors from "cors"
import cookieParser from "cookie-parser";



config({
    path:"./data/config.env"
  })
  app.use(cors({
    origin:[process.env.FRONTEND_URL] ,
    method:["GET","POST"],
    credentials:true,
  }))
 

//using middlewares
app.use(express.json())
app.use(cookieParser())
app.use(userRouter)
app.use(messageRouter)



app.get("/",(req,res)=>{
    res.send("Server is working")
})

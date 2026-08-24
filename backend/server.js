import express from "express"
import cors from 'cors'
import 'dotenv/config';
import { connectDB } from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import { adminRouter } from "./routes/adminRoutes.js";


//app config
const app = express()
const port = process.env.PORT
// db connection
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())




//api endpoints
app.use("/api/admin" ,adminRouter)  



app.get("/" , (req,res,next)=>{
    res.send("API WORKING Good")
})

app.listen(port ,()=> console.log(`server started on http://localhost:${port}`))
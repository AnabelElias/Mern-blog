import express from "express"
import mongoose from "mongoose"
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import dotenv from "dotenv"
dotenv.config()

const app= express();


//middle wares
app.use(express.json())

const {MONGODB_URL}=process.env
//connect to mongodb
mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log(`connected to database`)
})
.catch((err)=>{
console.log(err)
})

//test api route
app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)

//middleware to handle error
app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500;
  const message=err.message||"Internal server Error";
  res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })

})



app.listen(5000,()=>{
    console.log(`server is runing on port 5000`)
})
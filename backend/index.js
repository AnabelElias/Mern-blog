import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const app= express();

const {MONGODB_URL}=process.env
//connect to mongodb
mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log(`connected to database`)
})
.catch((err)=>{
console.log(err)
})



app.listen(5000,()=>{
    console.log(`server is runing on port 5000`)
})
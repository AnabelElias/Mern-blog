import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {errorHandler} from "../../utils/error.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const signup=async(req,res,next)=>{
     const {username,email,password}=req.body;
     if(!username||!email||!password||username===''||email===''||password===''){
        next(errorHandler(400,"All fields are required please"))
     }
     try {
        const hashPassword=await bcrypt.hash(password,10)
       const newUser=await User.create({
        username,email,password:hashPassword
       })
       res.status(200).json(newUser)
     } catch (error) {
        next(error)
     }
}

//Sign in user
export const signin=async(req,res,next)=>{
   const {email,password}=req.body;
   if(!email||!password||email===''||password===''){
      next(errorHandler(400,'All fields are required'));
   }
try {
   const user=await User.findOne({email});
   if(!user){
      next(errorHandler(400,'Invalid email or password'))
   }
   const comparePassword=await bcrypt.compare(password,user.password)
   if(!comparePassword){
      next(errorHandler(400,'Invalid password'))
   }

   const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY
    );
    user.password=undefined
   res.status(200).cookie('access_token',token,{httpOnly:true}).json(user)
} catch (error) {
   next(error)
}
}
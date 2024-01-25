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
      { id: user._id,isAdmin:user.isAdmin },
      process.env.SECRET_KEY
    );
    user.password=undefined
   res.status(200).cookie('access_token',token,{httpOnly:true}).json(user)
} catch (error) {
   next(error)
}
}

//signin with google
export const google = async(req,res,next)=>{
   const {email,name,googlePhotoUrl}=req.body;
   try {
      const user=await User.findOne({email})
      if(user){
         const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY)
         user.password=undefined;
         res.status(200).cookie('access_token',token,{
            httpOnly:true
         }).json(user)
      }else{
         const generatedPassword=Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
         const hashedPassword=await bcrypt.hash(generatedPassword,10)
         const newUser= await User.create({
            username:name.toLowerCase().split('').join('') + Math.random().toString(9).slice(-4),
            email,
            password:hashedPassword,
           profilePicture: googlePhotoUrl
         
         });
         const token=jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.SECRET_KEY)
         newUser.password=undefined;
         res.status(200).cookie('access_token',token,{
            httpOnly:true
         }).json(newUser)
         }

      
   } catch (error) {
      next(error)
   }
}
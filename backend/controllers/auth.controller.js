import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {errorHandler} from "../../utils/error.js"

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
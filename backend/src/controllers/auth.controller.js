import User from "../models/user.model.js"
import bcrypt from "bcryptjs" 
import {generateToken} from "../lib/utils.js"
export const signup= async (req,res)=>{
    const {fullName,email,password}=req.body;


    try{ 
        if (!fullName|| !email|| !password){
            return res.status(400).json({message:"all fiels are required"})
        }

        if(password.length<6){
            return res.status(400).json({message:"password must be atleast 6 characters"})
        }
        const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;   
        if (!emailRegex.test(email)){
               return res.status(400).json({message:"invalid email format"});
        }
        const user= await User.findOne({email});
        if(user) return res.status(400).json({message:" Email already exists"})

        const salt= await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)

        const newUser= new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })
        }
        else{
            res.status(400).json({message:"failed to create user"})
        }


    }
catch(error){
    console.log("error in signup controller",error.message);
    res.status(500).json({message:"internal server error"});
}


};
import User from "../models/user.model.js"
import bcrypt from "bcryptjs" 
import {generateToken} from "../lib/utils.js"
import {sendWelcomeEmail} from "../email/emailHandlers.js"
import {ENV} from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";
export const signup= async (req,res)=>{

    console.log('Request received:', req.body);

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
            const savedUser= await newUser.save();
            generateToken(savedUser._id,res);

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            });
            try{
                await sendWelcomeEmail(savedUser.email,savedUser.fullName,ENV.CLIENT_URL);
            }
            catch (error){
                console.error("failed to send welcome email",error)
            }
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
export const login= async (req,res)=>{
  const {email,password}=req.body;
  console.log("request recieved ",req.body)

   try{
    if(!email) return res.status(400).json({message:"email is required"})
    const user=await User.findOne({email});
    if(!user) return res.status(400).json({message:"invalid credentials"})
    const passwordCorrect= await bcrypt.compare(password,user.password)
     if(!passwordCorrect) return res.status(400).json({message:"invalid credentials"})
generateToken(user._id,res);

     res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
     });
   }
   catch(error){
    console.log("error in login credentials",error)
    res.status(500).json({message:"internal server error"})
   }
};


export const logout=  (_,res)=>{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"logged out successfully"})

};
export const updateProfilePic= async (req,res)=>{
    try{
    const {profilePic}=req.body;
    if(!profilePic) return res.status(400).json({message:"profile pic is required"})
    const userId= req.user._id;
    const uploadResp=await cloudinary.uploader.upload(profilePic)
    const updatedResponse = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new: true})
    res.status(200).json({message:"profilePic Updated"})
}
    catch(error){
        console.log("error in update profile",error)
        res.status(500).json({message:"internal server error"});
    }
}
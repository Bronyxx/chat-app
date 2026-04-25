import User from "../models/user.model.js"
import {ENV} from "../lib/env.js";
import jwt from "jsonwebtoken";


export const protectRoute = async(req,res,next)=>{
  const token= req.cookies.jwt;
  if(!token) {
    res.status(401).json({message:"not authorized"})
  }
  try{
    
    const decoded=jwt.verify(token,ENV.JWT_SECRET);
    if(!decoded) {res.status(401).json({message:"not authorized"})}
    const user=await User.findById(decoded.id).select("-password");
    if(!user){res.status(404).json({message: "no use found"})}
    req.user=user;
    next();
  }
  catch(error){
    console.log("error in protectRoute middleware",error)
    res.status(500).json({message:"internal server error"})
  }
};
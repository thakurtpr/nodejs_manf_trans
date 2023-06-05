import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const newUser =  async (req,res)=>{

    try {
        const { username,email, password, address, userType } = req.body;
        let user = await User.findOne({email})
      
        if(user) return res.status(404).json({
            success:false,
            message:"User already exist",
        }) 
        
         const hashedPassword = await bcrypt.hash(password,10);
         
         user = await User.create({username,email,password:hashedPassword,address,userType})
         
         const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
          res.status(200).cookie("token",token,{
            httpOnly:true,
            maxAge:25*60*1000,
            sameSite:"none",
            secure:true
          }).json({
            success:true,
            message:"User Registered Successfully",
            userType,

          })  
        
    } catch (error) {
        console.log("error in registering",error);
    }
}




export const loginUser = async(req,res)=>{
    try {
      const {email,password} = req.body;
      const user = await User.findOne({email}).select("+password") 
      // O
      if(!user) return res.status(404).json({
        success:false,
        message:"User Doesn't Exist"
      })
      const isMatch = await bcrypt.compare(password,user.password )
      if(!isMatch) return res.status(404).json({
        success:false,
        message:"Wrong Password"
      })

      const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
   
      res.status(200).cookie("token",token,{
        httpOnly:true,
        maxAge:25*60*1000,
        sameSite:"none",
        secure:true
      }).json({
        success:true,
        message:"Welcome Back User",
        userType:user.userType,
         
      })   
    } catch (error) {
      console.log("Some Error Occured ");
    }
  }

export const myAddress = async(req,res) =>{
  try {

    res.status(200).json({
      success:true,
      address:req.user.address
    })

  } catch (error) {
    console.log(error);
  }
}


export const logout = (req,res)=>{
    
    
  res.status(200).cookie("token","",{
     expires:new Date(Date.now()),            
     sameSite:"none",
     secure:true
     
 }).json({
     success:true,
     message:"Logged Out Successfully"

  })
}

export const checkAuth = (req,res) =>{
  try {
     res.json({
      success:true,
      userType:req.user.userType
     })
  } catch (error) {
    console.log(error);
  }
}
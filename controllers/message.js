import { Message, TransporterReply } from "../models/message.js"
import { User } from "../models/user.js"


export const newmanMessage = async(req,res,next) =>{
    try {
        const {orderID,to,from,quantity,address,transporter} = req.body 
         await Message.create({orderID,to,from,quantity,address,transporter,user:req.user})

         res.status(201).json({
            success:true,
            message:"Message Sent Successfully"
        })
    } catch (error) {
        next(error.message)
    }
}
export const newtranMessage = async(req,res,next) =>{
   try {
      const {orderId, price} = req.body 
      await TransporterReply.create({orderId,price})
      res.status(201).json({
        status:true,
        message:"Message Sent Successfully",
        
      })
   } catch (error) {
      next(error)
   }
}




export const getTransporters = async(req,res,next) =>{
    try {
       const users =  await User.find({userType:"Transporter"})
        res.status(201).json({
            success:true,
            users
        })
    } catch (error) {
        next(error)
    }
}

export const getMyMessages = async(req,res,next) =>{
    try {
         const messages = await Message.find({transporter:req.user.username})
         res.status(201).json({
            success:true,
            messages,
         })
    } catch (error) {
        next(error)
    }
}


export const getMySentMessages = async(req,res) => {
    try {
        const  userid = req.user._id;
        const messages  = await Message.find({user:userid})
        res.status(201).json({
           success:true,
           messages,
        })
   } catch (error) {
       next(error)
   }
}


export const getTransReply = async(req,res) =>{
    const {term} = req.query
    try {
        const tReply = await TransporterReply.find({orderId:term})
        {tReply=="" ? res.json({
            success:true,
            Reply:""
        }):
        res.json({
            success:true,
            Reply:tReply
        })}
    } catch (error) {
        next(error)
    }
}
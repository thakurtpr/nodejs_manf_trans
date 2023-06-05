import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    orderID: {
        type: String,
        unique: true,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      transporter: {
        type: String,
        required: true,
      },
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
     },
})    

const tReplySchema = new mongoose.Schema({
      orderId: {
        type: String,
        unique:true,
        required: true
      },
      price: { 
        type: Number,
        required: true 
      },
      
});

export const Message = mongoose.model("Message",messageSchema)
export const TransporterReply = mongoose.model("TransporterReply",tReplySchema)
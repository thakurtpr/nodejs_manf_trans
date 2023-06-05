import mongoose from "mongoose"

//schema
const schema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,  
    },
    email:{
        type:String,
        unique:true,    
        required:true,  
    },
    password:{
        type:String,
        select:false,
        required:true,  
    },
    address:{
        type:String,
        required:true,  
    },
    userType:{
        type:String,
       required:true, 
    },  

})
export const User = mongoose.model("User",schema)

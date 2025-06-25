import mongoose from "mongoose";

const passwordSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },createdAt:{
        type:Date,
        default:Date.now,
    },
    userId:{
        type:String,
        required:true,
    }
})

const Password=mongoose.model("Password",passwordSchema);
export default Password;
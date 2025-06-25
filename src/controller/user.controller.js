import User from "../model/user.model.js";
import brcypt from "bcryptjs";
import jwt from "jsonwebtoken";


const  userSignup=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPasword=await brcypt.hash(password,10)

        const newuser=new User({
            username:username,
            email:email,
            password:hashedPasword
        })

        await newuser.save();

        const token=jwt.sign(
            { userId: newuser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(201).json({ message: "User created successfully", user: newuser });
    }catch(error){
        console.error("Error during user signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default userSignup;
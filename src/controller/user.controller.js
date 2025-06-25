import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const userSignup=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPasword=await bcrypt.hash(password,10)

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


export const userLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        const user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token=jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({ message: "Login successful", user });

    }catch(error){
        console.error("Error during user login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


import User from "../model/user.model.js";


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

        const newuser=new User({
            username,
            email,
            password
        })

        await newuser.save();

        res.status(201).json({ message: "User created successfully", user: newuser });
    }catch(error){
        console.error("Error during user signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default userSignup;
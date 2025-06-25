import Password from '../model/password.model.js';


export const createPassword = async (req, res) => {
    try{
        const {title,username,email,password}=req.body;
        if(!title || !username || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const newPassword = new Password({
            title,
            username,
            email,
            password,
            userId: req.user.userId
        });
        await newPassword.save();
        res.status(201).json({ message: "Password created successfully", password: newPassword });
    }
    catch (error) {
        console.error("Error creating password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
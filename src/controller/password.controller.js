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


export const getAllPassword= async (req,res)=>{
    try{
        const passdetails=await Password.find({userId:req.user.userId});
        if(!passdetails || passdetails.length === 0){
            return res.status(404).json({ message: "No passwords found" });
        }
        res.status(200).json({ message: "Passwords fetched successfully", passwords: passdetails });

    }catch(error){
        console.error("Error fetching passwords:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const deletePassword=async(req,res)=>{
    try{
        const {title,username,email,id}=req.body;
        if(!title || !username || !email){
            return res.status(400).json({ message: "All fields are required" });
        }

        const deletedPassword = await Password.findOneAndDelete({
            title,
            username,
            email,
            _id: id,
            userId: req.user.userId
        });
        if(!deletedPassword){
            return res.status(404).json({ message: "Password not found" });
        }
        res.status(200).json({ message: "Password deleted successfully", password: deletedPassword });
    }catch(error){
        console.error("Error deleting password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
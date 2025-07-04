import jwt from 'jsonwebtoken';


const authuser=(req,res,next)=>{
    try{
        const token=req.cookies.token 
        if(!token){
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    }catch(error){
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Unauthorized access" });
    }
}

export {authuser as authUser};
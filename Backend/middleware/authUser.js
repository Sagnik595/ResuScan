import jwt from "jsonwebtoken";

const authUser = async(req,res,next)=>{

    try {
        const authHeader = req.headers.authorization;
        if(!authHeader)
            return res.json({success:false,message:"User does not exists!!"});
        const token = authHeader.split(" ")[1];
        if(!token)
            return res.json({success:false,message:"No token!!"});
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role!=="user")
            return res.json({success:false,message:"Unauthorized!!"});

        req.userID = decoded.id
        req.userRole = decoded.role
        next();
    } catch (error) {
        console.log(error.message);
        return res.json({success:false,message:error.message});
    }
}


export default authUser;
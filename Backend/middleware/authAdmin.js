// import mongoose from "mongoose";
// import express from 'express';
// import jwt from 'jsonwebtoken';


// const authAdmin = async(req,res,next)=>{
    
//     try {
//         const authHeader = req.headers.authorization;
//         if(!authHeader)
//             return res.json({success:false,message:"No token!!"});

//         const token = authHeader.split(" ")[1];

//         if(!token)
//             return res.json({success:false,message:"Invalid token!!"});

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         if(decoded.role!=="admin")
//             return res.json({success:false,message:"Unauthorized"});
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.json({success:false,message:error.message});
//     }
// }


// export default authAdmin;



import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not provided",
      });
    }

    let decoded;

    // Verify token with explicit expiration handling
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Ensure only admins can access
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Attach decoded payload to request
    req.user = decoded;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default authAdmin;
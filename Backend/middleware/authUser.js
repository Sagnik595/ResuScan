// import jwt from "jsonwebtoken";

// const authUser = async(req,res,next)=>{

//     try {
//         const authHeader = req.headers.authorization;
//         if(!authHeader)
//             return res.json({success:false,message:"User does not exists!!"});
//         const token = authHeader.split(" ")[1];
//         if(!token)
//             return res.json({success:false,message:"No token!!"});
//         const decoded = jwt.verify(token,process.env.JWT_SECRET);
//         if(decoded.role!=="user")
//             return res.json({success:false,message:"Unauthorized!!"});

//         req.userID = decoded.id
//         req.userRole = decoded.role
//         next();
//     } catch (error) {
//         console.log(error.message);
//         return res.json({success:false,message:error.message});
//     }
// }


// export default authUser;


import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
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

    // Verify token with specific expiration handling
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

    // Ensure only normal users can access
    if (decoded.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Attach user info to request
    req.userID = decoded.id;
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

export default authUser;
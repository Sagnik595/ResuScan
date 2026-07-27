
const storeJDID = async(req,res,next)=>{
    try {
        const {id} = req.params;
        if (!id) 
            return res.json({ success: false, message: "No ID provided!!" });
        req.jobID = id;
        next();
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

export default storeJDID;
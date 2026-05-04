// uploadJD
// parseJD

// API to upload job description
const uploadJD = async(req,res)=>{
    try {
        const {jdData} = req.body;
        if(!jdData)
            return res.json({success:false,message:"Please provide a valid job description!!"});
        
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
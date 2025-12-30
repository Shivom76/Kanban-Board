const User=require('../models/User')
const Todo=require('../models/Todo')
const jwt=require('jsonwebtoken')

const isOwner=async(req,res,next)=>{
    // const {username}=req.body
    // const presentUser=await User.findOne({username})
    // if(!presentUser){
    //     return res.status(401).json({
    //         success:false,
    //         message:"You are not a user"
    //     })
    // }

    const authHeader=req.headers.authorization;
    const token=authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({
            success:false,
            message:"No Token provided"
        })
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
            return res.status(403).json({ success: false, message: "Invalid token" });
        }
        req.userId = decoded.id;
        next()
    })
}


module.exports={isOwner};
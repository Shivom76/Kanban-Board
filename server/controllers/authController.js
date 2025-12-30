const bcrypt=require('bcrypt')
const User=require('../models/User.js')
const jwt=require("jsonwebtoken")

// Register controller

const registerController=async(req,res)=>{
    const {username,email,password,status}=req.body
    // console.log(username,password)

    try{
        const salt=await bcrypt.genSalt(10)
        const hashedPass=await bcrypt.hash(password,salt)

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already taken"
            });
        }
        
        const newUser=new User({
            username,
            email,
            password:hashedPass,
            status:status
        })

        await newUser.save()

        const token=jwt.sign(
            {id:newUser._id},
            process.env.SECRET_KEY,
            {
                expiresIn:"1d"
            }
        )

        res.status(201).json({
            success:true,
            message:"New User registered",
            token:token,
            body:{
                username: newUser.username
            }
        })

        console.log(token)
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


// Login controller

const loginController=async(req,res)=>{
    try{
        const {username,password}=req.body

        const currUser=await User.findOne({username})
        if(!currUser){
            return res.status(401).json({
                success:false,
                message:"User not found"
            })
        }

        const isCorrectPassword=await bcrypt.compare(password,currUser.password)
        if (!isCorrectPassword){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const token=jwt.sign(
            {
                id:currUser._id
            },
            process.env.SECRET_KEY,
            {
                expiresIn:"1d"
            }
        );

        res.status(200).json({
            success:true,
            message:"Welcome user",
            token:token,
            body:{
                username:currUser.username
            }
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


module.exports={registerController, loginController}
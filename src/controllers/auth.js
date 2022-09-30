const User = require("../models/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const asyncHandler = require("../middlewares/asyncHandler")
const ErrorResponse = require("../utils/errorResponse")


const login = asyncHandler( async(req,res,next)=>{
    const {email,password,} = req.body
    
    // check for empty fields
    if(!email || !password) return next(new ErrorResponse("please enter your email and password",400))

    const user = await User.findOne({email}).select("+password")

    if(!user) return next(new ErrorResponse("invalid credentials",400))

    const validPassword = await bcrypt.compare(password,user.password)

    if(!validPassword) return next(new ErrorResponse("invalid credentials",400))

    sendCookie(user,200,res)


})

// cookie function
const sendCookie = (user,statusCode,res)=>{
    const token = jwt.sign({id:user._id,email:user.email,username:user.username,role:user.role,isSubscribed:user.isSubscribed},process.env.JWT_SECRET,{expiresIn:"30d"})
     const options = ({
         expires: new Date(Date.now()+2592000000),
         httpOnly:true
     })
     res.status(statusCode).cookie("token",token,options).json({success:true,token})
}

module.exports = login
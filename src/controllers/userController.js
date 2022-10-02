const User = require("../models/usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const asyncHandler = require("../middlewares/asyncHandler")
const ErrorResponse = require("../utils/errorResponse")
const validateRegisterSchema = require("../middlewares/validate")


const register = asyncHandler(async(req,res,next)=>{
    let {name,email,password} = req.body

    const {error} = validateRegisterSchema(req.body);
                if(error) return next(new ErrorResponse(`${ error.details[0].message}`,400))
                   

    const isMailExist = await User.findOne({email})
    if(isMailExist)return next(new ErrorResponse(`${email} already exist`))

    password =await bcrypt.hash(password,12)

    const user = await User.create({name,email,password})

    res.status(201).json({success:true,data:user})
})


// desc => get me
// route => GET/api/v1/auth
const getUser = asyncHandler(async(req,res,next)=>{
    
    const id = req.user.id
   
    // get a user from DB
    const user = await User.findById(id)
   
    res.status(200).json({success:true,data:user})
})


module.exports = register

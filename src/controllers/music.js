const asyncHandler = require("../middlewares/asyncHandler")
const Music = require("../models/MusicModel")
const User = require("../models/usermodel")
const ErrorResponse = require("../utils/errorResponse")

const createMusic = asyncHandler(async(req,res,next)=>{

    const music = await Music.create(req.body)

    if(!music) return next(new ErrorResponse("music could not be created",500))

    res.status(201).json({success:true,data:music})
})


const getMusic = asyncHandler(async(req,res,next)=>{

    const userId = req.user.id

    const music = await Music.findById(req.params.id)

    if(!music) return next(new ErrorResponse("music not found",404))

    const user = await User.findById(userId)

    if(user.contentCount == 2 && user.isSubscribed == false) return next(new ErrorResponse("you have exceeded your free music for today kindly subscribe to a plan",400))

    user.contentCount = user.contentCount + 1

    await user.save()

    res.status(200).json({success:true,data:music})
})



module.exports = {createMusic,getMusic}
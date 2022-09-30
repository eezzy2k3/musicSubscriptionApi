const asyncHandler = require("../middlewares/asyncHandler")
const Subscription = require("../models/subModel")
const ErrorResponse = require("../utils/errorResponse")

const createSub = asyncHandler(async(req,res,next)=>{
    const {plan} = req.body
    const user = req.user.id
   
    let bill;
    if(plan == "daily"){
        bill = 20
    }else if(plan == "monthly"){
        bill = 100
    }else if(plan == "annually"){
        bill = 1000
    }
    if(req.user.isSubscribed == true) return next(new ErrorResponse("you still have an active subscription",400))
    const checkPlan = await Subscription.findOne({user})
    if (checkPlan){
        await checkPlan.remove()
    }
    const subscription = await Subscription.create({user,plan,bill})

    res.status(201).json({success:true,data:subscription})
    

})

const getSub = asyncHandler(async(req,res,next)=>{
     const user = req.user.id
     const subscription = await Subscription.findOne({user})
     if(!subscription) return next(new ErrorResponse("No subscription found",404))
     res.status(200).json({success:true,data:subscription})
})

module.exports = {createSub,getSub}
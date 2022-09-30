const Flutterwave = require('flutterwave-node-v3');
const asyncHandler = require('../middlewares/asyncHandler');
const Subscription = require('../models/subModel');
const User = require("../models/usermodel")
const Plan = require("../models/plan");
const ErrorResponse = require('../utils/errorResponse');



const checkout = asyncHandler(async(req,res,next)=>{
    
    const id = req.user.id
   
    const ref = Math.floor(Math.random()*1000000+1)
    
    const mref = `rf${ref}`

    const user = await User.findById(id)

    const subscription = await Subscription.findOne({user:id})

    

    const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

    

   


if(subscription){


    let payload =  {
        card_number: req.body.card_number,
        cvv: req.body.cvv,
        expiry_month: req.body.expiry_month,
        expiry_year: req.body.expiry_year,
        currency: "NGN",
        amount: subscription.bill,
        redirect_url: "https://www.google.com",
        fullname: user.name,
        email: user.email,
        "enckey": process.env.FLW_ENCRYPTION_KEY,
        "tx_ref": mref
    
    }
    

    try {
        
        const response = await flw.Charge.card(payload)
        //    console.log(response)
           if (response.meta.authorization.mode === 'pin') {
                let payload2 = payload
                payload2.authorization = {
                    "mode": "pin",
                    "fields": [
                        "pin"
                    ],
                    "pin": 3310
                }
                const reCallCharge = await flw.Charge.card(payload2)
        
                const callValidate = await flw.Charge.validate({
                    "otp": "12345",
                    "flw_ref": reCallCharge.data.flw_ref
                })
                console.log(callValidate)
                if(callValidate.status === 'success') {
                   

                    // set expiration date and issubscribed to true
                    
                    if(subscription.plan == "daily"){
                        user.expireAt =  new Date(Date.now() + 86400000 )
                        user.isSubscribed = true
                        await user.save()
                    }
                    if(subscription.plan == "monthly"){
                        user.expireAt =  new Date(Date.now() + 2592000000 )
                        user.isSubscribed = true
                        await user.save()
                    }
                    if(subscription.plan == "annually"){
                        user.expireAt =  new Date(Date.now() + 31556952000 )
                        user.isSubscribed = true
                        await user.save()
                    }
                     
                    // create a new plan
                    const plan = await Plan.create({
                        user:id,
                        plan:subscription.plan,
                        bill: subscription.bill,
                        expireAt:user.expireAt.toString()
                    })
        
                   
        
                    //delete subscription plan
                     await Subscription.findByIdAndDelete({_id: subscription._id})
                   
                     return res.status(201).json({success:true,msg:"payment successful","flw_ref": reCallCharge.data.flw_ref,data:plan})
              
                    } else {
                   return next(new ErrorResponse("payment failed",500))
                }
            }
            if( response.meta.authorization.mode === 'redirect') {
        
                let url = response.meta.authorization.redirect
                open(url)
            }
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("payment failed",500))
    }
    
   

} else {
    return next(new ErrorResponse("no subscription plan found",404))
}

})


const getPlan = asyncHandler(async(req,res,next)=>{
   
    const user = req.user.id
    
    const plan = await Plan.findOne({user}).sort({ date: -1 })
   
    if(!plan) return next(new ErrorResponse("you have no active plan",404))
   
    res.status(200).json({success:true,data:plan})
})

module.exports = {checkout,getPlan}
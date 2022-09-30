const mongoose = require("mongoose")

const planSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    plan:{
        type:String
    },
    bill:{
        type:Number
    },
    expireAt:{
        type:String
    }
},{timestamps:true})

const Plan = mongoose.model("Plan",planSchema)

module.exports = Plan
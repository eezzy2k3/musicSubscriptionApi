const mongoose = require("mongoose")

const subSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    plan:{
        type:String,
        required:true,
        enum:["daily","monthly","annually"]
    },
    bill:{
        type:Number,
        required:true
    },

},{timestamps:true})

const Subscription = mongoose.model("Subscription",subSchema)

module.exports = Subscription
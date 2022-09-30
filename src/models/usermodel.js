const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match:[/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,"Please enter a valid email address"],
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false

    },
    role:{
        type:String,
        default:"user"
    },
    contentCount:{
        type:Number,
        default:0
    },
    isSubscribed:{
        type:Boolean,
        default:false
    },
    expireAt:{
        type:Date
    }
},{timestamps:true})


const User = mongoose.model("User",userSchema)

module.exports = User
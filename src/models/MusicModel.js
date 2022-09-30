const mongoose = require("mongoose")

const musicSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    yearOfRelease:{
        type:String,
        required:true
    }, 
    label:{
        type:String,
        required:true
    },
    ratings:{
        type:String
    },
    album:{
        type:String,
        required:true
    },
    song:{
        type:String
    }
},{timestamps:true})

const Music = mongoose.model("Music",musicSchema)

module.exports = Music


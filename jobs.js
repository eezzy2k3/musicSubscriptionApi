const cron = require("node-cron")
const Plan = require("./src/models/plan")
const User = require("./src/models/usermodel")
const moment = require("moment")


    const task = cron.schedule('0 0 * * *', async(req,res) => {
        const users = await User.find()
        for(let i = 0; i<users.length; i++){
            users[i].contentCount = 0
            await users[i].save()
            console.log("task ran")
      }})

       const task2 = cron.schedule('* * * * *', async(req,res) => {
        const users = await User.find()
        // set todays date
        let todaysDate = moment(new Date()).format("YYYY-MM-DD hh:mm")
        for(let i = 0; i<users.length; i++){
           if(moment(users[i].expireAt).format("YYYY-MM-DD hh:mm") === todaysDate){
               users[i].isSubscribed = false
              await Plan.findOneAndDelete({user:users[i]._id})
               await users[i].save()
               console.log("task2 ran")
           }
      }})

  module.exports = {task,task2}


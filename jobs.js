const cron = require("node-cron")
const Plan = require("./src/models/plan")
const User = require("./src/models/usermodel")


    const task = cron.schedule('0 0 * * *', async(req,res) => {
        const users = await User.find()
        for(let i = 0; i<users.length; i++){
            users[i].contentCount = 0
            await users[i].save()
            console.log("task ran")
      }})

       const task2 = cron.schedule('* * * * *', async(req,res) => {
        const users = await User.find()
        for(let i = 0; i<users.length; i++){
           if(users[i].expiredAt == Date.now()){
               users[i].isSubscribed = false
              await Plan.findOneAndDelete({user:users[i]._id})
               await users[i].save()
               console.log("task2 ran")
           }
      }})

  module.exports = {task,task2}


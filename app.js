require("dotenv").config()
const express = require("express")
const connectDb = require("./config/config")

const userRouter = require("./src/routers/userRoute")

const musicRouter = require("./src/routers/musicRoute")

const authRouter = require("./src/routers/auth")

const subscriptionRouter = require("./src/routers/subscriptionRoute")

const planRouter = require("./src/routers/planRoute")

const errorHandler = require("./src/middlewares/errorHandler")

const cookieparser = require("cookie-parser")

const {task,task2} = require("./jobs")

const app = express()

connectDb()

app.use(express.json())

app.use(cookieparser())



task.start()
task2.start()

app.use("/api/v1/user",userRouter)
app.use("/api/v1/music",musicRouter)
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/subscription",subscriptionRouter)
app.use("/api/v1/plan",planRouter)

app.use(errorHandler)




const port = process.env.PORT || 5000

app.listen(port,()=>{
 console.log(`app is listening on port ${port}`)
})
const  {register,user} = require("../controllers/userController")
const {authorize}  = require("../middlewares/auth")

const express = require("express")

const router = express.Router()

router.route("/")
.post(register)
.get(authorize,user)

module.exports = router
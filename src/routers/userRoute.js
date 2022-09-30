const register = require("../controllers/userController")

const express = require("express")

const router = express.Router()

router.route("/")
.post(register)

module.exports = router
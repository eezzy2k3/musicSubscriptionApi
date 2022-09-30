const {createSub,getSub} = require("../controllers/subscription")
const authorize = require("../middlewares/auth")

const express = require("express")

const router = express.Router()

router.use(authorize)
router.route("/")
.post(createSub)
.get(getSub)

module.exports = router
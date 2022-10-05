const {checkout,getPlan} = require("../controllers/plan")
const {authorize}  = require("../middlewares/auth")


const express = require("express")

const router = express.Router()
router.use(authorize)
router.post("/checkout",checkout)
router.get("/getplan",getPlan)

module.exports = router
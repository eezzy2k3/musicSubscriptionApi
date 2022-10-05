const {createMusic, getMusic} = require("../controllers/music")

const {authorize,access}  = require("../middlewares/auth")

const express = require("express")

const router = express.Router()

router.route("/")
.post(authorize,access("admin"),createMusic)

router.route("/:id")
.get(authorize,getMusic)

module.exports = router
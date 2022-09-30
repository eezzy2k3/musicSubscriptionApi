const {createMusic, getMusic} = require("../controllers/music")

const authorize = require("../middlewares/auth")

const express = require("express")

const router = express.Router()

router.route("/")
.post(createMusic)

router.route("/:id")
.get(authorize,getMusic)

module.exports = router
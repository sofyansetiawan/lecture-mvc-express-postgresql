const express = require("express");

const router = express.Router();

const Controller = require("../controllers/Controller");

const peopleRouter = require("./people");

router.get("/", Controller.home);

router.use("/peoples", peopleRouter);

module.exports = router;
const express = require("express");
const controller = require("./user.controller");
const router = express.Router();

router.post("/login", controller.login);
router.post("/createAccount", controller.createAccount);

module.exports = router;

const express = require("express");
const router = express.Router();
require("dotenv").config();

const checkToken = require("./modules/checkToken");
const AuthController = require("./controllers/AuthController");
const SelectorController = require("./controllers/SelectorController");

router.post("/auth/login", AuthController.login);
router.post("/auth/check", AuthController.check);
router.get("/auth/logout", AuthController.logout);

router.post("/select/year", SelectorController.year);

module.exports = router;

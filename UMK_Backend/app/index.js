const express = require("express");
const router = express.Router();
require("dotenv").config();

const checkToken = require("./modules/checkToken");
const AuthController = require("./controllers/AuthController");
const SelectorController = require("./controllers/SelectorController");
const UMKController = require("./controllers/UMKController");

router.post("/auth/login", AuthController.login);
router.post("/auth/check", AuthController.check);
router.get("/auth/logout", AuthController.logout);

router.post("/select/year/default", checkToken, SelectorController.yearDefault);
router.post("/select/year/list", checkToken, SelectorController.yearList);
router.post("/select/kafedra/list", checkToken, SelectorController.kafedraList);

router.post("/umk/list", checkToken, UMKController.list);
router.post("/umk/detail", checkToken, UMKController.detail);
router.get("/umk/download", checkToken, UMKController.download);


module.exports = router;

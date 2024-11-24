const express = require("express");
const userControllers = require("../controllers/userContriller");

const router = express.Router();

router.post("/register", userControllers.RegisterController);

module.exports = router;

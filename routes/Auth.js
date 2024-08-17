const express = require("express");
const authValidator = require("../midlewares/AuthValidatorMW");
const authController = require("../controllers/AuthController");

const router = express.Router();
router.use(express.json());

router.post("/", authValidator, authController.validateUser);

module.exports = router;
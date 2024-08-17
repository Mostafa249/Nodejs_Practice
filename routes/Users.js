const express = require("express");
const usersValidator = require("../midlewares/UsersValidatorMW");
const userController = require("../controllers/UsersController");
const { adminAuth } = require("../midlewares/AuthPermissionMW");

const router = express.Router();

router.use(express.json());
router.use(adminAuth);
router.post('/', usersValidator, userController.addNewUser);

module.exports = router;
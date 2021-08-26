const express = require("express");

const userController = require("./userController");
const authController = require("./authController")
const userRouter = express.Router();


userRouter.route('/current-user')
.get(authController.authorize, userController.getCurrentUser);

module.exports = userRouter;
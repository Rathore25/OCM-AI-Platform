const express = require("express");

const authController = require("./authController");
const authRouter = express.Router();


authRouter.route('/signup').post(authController.signup);

authRouter.route('/login').post(authController.login);

authRouter.route('/logout').get(authController.logout);

module.exports = authRouter;
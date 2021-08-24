const express = require("express");

const userController = require("./userController");
const authController = require("./authController")
const userRouter = express.Router();


userRouter.route('/')
.get(userController.getAllUsers)
.post(userController.createUser);

userRouter.route('/current-user')
.get(authController.authorize, userController.getCurrentUser);

userRouter.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = userRouter;
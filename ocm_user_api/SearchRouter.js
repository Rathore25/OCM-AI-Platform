const express = require("express");

const searchController = require("./searchController");
const authController = require("./authController");
const searchRouter = express.Router();

searchRouter.route('/process')
.post(authController.authorize, authController.restrictTo('admin', 'user'), searchController.process);

searchRouter.route('/search')
.post(authController.authorize, authController.restrictTo('admin', 'user'), searchController.search);

searchRouter.route('/update')
.post(authController.authorize, authController.restrictTo('admin', 'user'), searchController.relevant);

module.exports = searchRouter;
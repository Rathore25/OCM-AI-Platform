const AppError = require("./appErrors");

exports.getAllUsers = (req, res) => {
    console.log("get all users");
}

exports.getUser = (req, res) => {
    console.log("get user");
}

exports.createUser = (req, res) => {
    
}

exports.getCurrentUser = (req, res) => {
    if (!req.user) {
        return next(new AppError("You are not logged in!!", 401));
    }
    res.status(200).json({
        status: "Success",
        user: req.user
    })
}

exports.updateUser = (req, res) => {
    console.log("update user");
}

exports.deleteUser = (req, res) => {
    console.log("delete user");
}
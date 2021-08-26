const AppError = require("./appErrors");

exports.getCurrentUser = (req, res) => {
    if (!req.user) {
        return next(new AppError("You are not logged in!!", 401));
    }
    res.status(200).json({
        status: "Success",
        user: req.user
    })
}
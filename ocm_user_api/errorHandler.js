const AppError = require("./appErrors");

const handleDuplicateMongoError = (err) => {
    return new AppError("Email already exists, please try another!!", 400);
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Error";

    let error = {...err};
    if (error.code === 11000) error = handleDuplicateMongoError(error);

    res.status(error.statusCode).json({
        status: error.status,
        error,
        message: err.message
    })
}
const {promisify} = require("util");
const jwt = require('jsonwebtoken');
const AppError = require('./appErrors');
const catchAsync = require('./catchAsync');
const User = require('./userModel');


exports.authorize = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(new AppError("You are not logged in, please login to get access!!", 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
        return next(new AppError("User no longer exists!!", 401));
    }

    if (await user.changedPasswordAfter(decoded.iat)) {
        return next(new AppError("Password has changed recently, please login with new password!!", 401));
    }

    req.user = user;
    next();
})

exports.restrictTo = (...roles) => {
    return async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You are not authorized to perform this request!!", 401));
        }
        next();
    }
}

exports.signup = catchAsync(async (req, res) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true
    })

    res.status(201).json({
        status: "Success",
        token,
        user: newUser
    })
});

exports.login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }

    const user = await User.findOne({email}).select('+password');
    if (!user) return next(new AppError("No user with the provided email address", 400));

    if (!(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect password!!", 401));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true
    })

    res.status(200).json({
        status: "Success",
        token
    })
});
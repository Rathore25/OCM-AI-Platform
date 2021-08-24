const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name!!"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email!!'],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!!"],
        minLength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: "Passwords did not match!!"
        },
        select: false
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    passwordChangedAt: Date
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
})

userSchema.methods.changedPasswordAfter = async function(JWTTimeStamp) {
    if (this.passwordChangedAt) {
        return parseInt(this.passwordChangedAt.getTime() / 1000, 10) > JWTTimeStamp;
    }
    return false;
}

userSchema.methods.correctPassword = async (enteredPassword, actualPassword) => {
    return await bcrypt.compare(enteredPassword, actualPassword);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
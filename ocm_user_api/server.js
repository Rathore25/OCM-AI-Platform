const express = require("express");

const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require('./authRouter');

const userRouter = require('./userRouter');
const errorHandler = require("./errorHandler");
const AppError = require("./appErrors");
const searchRouter = require("./SearchRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config({path: "./config.env"});

const DB = process.env.MONGO.replace('<password>', process.env.MONGO_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log("DB Connection Successful!!"))
.catch(err => {
    console.log(err);
})

app.use(express.json());
app.use(cookieParser());

const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

// cors({credentials: true, origin: 'http://localhost:3000'})
// app.options('http://localhost:3000', cors());

app.use('/api/v1', searchRouter);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} not found!!`));
})

// app.use(errorHandler);

app.listen(8000, () => {
    console.log("Listening on port 8000!!");
})
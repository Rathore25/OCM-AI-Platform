const AppError = require("./appErrors");
const catchAsync = require("./catchAsync");
const axios = require("axios");

exports.process = catchAsync(async (req, res, next) => {
    const result = await axios.post("http://54.242.116.121:5001/api/v1/process/", {
        queries: req.body.queries,
        count: req.body.count,
        location: req.body.location
    })

    console.log(result);

    if (result.data.Status !== "Complete") {
        return next(new AppError("Error while processing your request, please try again!!"));
    }

    res.status(200).json({
        status: "Success",
        // queries: req.body.queries,
        // count: req.body.count,
        // location: req.body.location
        data: result
    })
});

exports.search = catchAsync(async (req, res, next) => {
    const resultsArray = req.body.csv.split(",");
    let query = "";
    resultsArray.forEach(result => {
        query += "(" + result + ")";
        query += " or ";
    });

    query = query.slice(0, -4);
    const searchRes = await axios.post("http://54.242.116.121:5001/api/v1/search/", {
        query,
        pageMaximum: req.body.count,
        pageNumber: req.body.pageNumber
    })

    if (!searchRes) {
        return next(new AppError("Search failed!!"));
    }

    const data = searchRes.data.hits.hits;

    res.status(200).json({
        status: "Success",
        // query
        data
    })
});
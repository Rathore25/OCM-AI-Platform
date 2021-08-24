const AppError = require("./appErrors");
const catchAsync = require("./catchAsync");
const axios = require("axios");

exports.process = catchAsync(async (req, res, next) => {
    const result = await axios.post("http://ocm_ai_app_api:5001/api/v1/process/", {
        queries: req.body.queries,
        count: req.body.count,
        location: req.body.location
    })

    if (result.data.Status !== "Complete") {
        return next(new AppError("Error while processing your request, please try again!!"));
    }

    // const query = modifyQuery(req.body.queries);
    // const searchResults = await axios.post("http://54.242.116.121:5001/api/v1/search/", {
    //     query,
    //     pageSize: req.body.pageSize,
    //     pageNumber: req.body.pageNumber
    // })

    // if (!searchResults) {
    //     return next(new AppError("Search failed!!"));
    // }

    // const data = searchResults.data.hits.hits;
    // console.log("successful")

    res.status(200).json({
        status: "Success",
        // data
    })
});

const modifyQuery = (csv) => {
    const resultsArray = csv.split(",");
    let query = "";
    resultsArray.forEach(result => {
        query += "(" + result + ")";
        query += " or ";
    });

    query = query.slice(0, -4);
    return query;
}

exports.search = catchAsync(async (req, res, next) => {
    const query = modifyQuery(req.body.csv);
    const searchRes = await axios.post("http://ocm_ai_app_api:5001/api/v1/search/", {
        query,
        pageSize: req.body.pageSize,
        pageNumber: req.body.pageNumber
    })

    if (!searchRes) {
        return next(new AppError("Search failed!!"));
    }
    console.log(searchRes);
    const data = searchRes.data.hits.hits;

    res.status(200).json({
        status: "Success",
        data
    })
});

exports.relevant = catchAsync(async (req, res, next) => {
    const relevanceRes = await axios.post("http://ocm_ai_app_api:5001/api/v1/update/relevance/", {
        url: req.body.url,
        relevance: req.body.relevance
    });

    if (relevanceRes.data.status !== 'Success') {
        return next(new AppError("Error updating relevance, please try again later", 401));
    }

    res.status(200).json({
        status: "Success"
    })
}) 
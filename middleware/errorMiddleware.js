const ApiError = require("../utils/apiError");

const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (err.name === "JsonWebTokenError") err = handleJwtInvalidSignture();
    if (err.name === "TokenExpiredError") err = handleJwtExpired();
    if (process.env.NODE_ENV === "development") {
        sendErrorForDev(err, res)
    } else {
        sendErrorForProd(err, res)
    }
}


const handleJwtInvalidSignture = () => new ApiError("Invalid token please login again", 401);
const handleJwtExpired = () => new ApiError("Expired token please login again", 401);
const sendErrorForDev = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    })
}

const sendErrorForProd = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
    })
}

module.exports = globalError;
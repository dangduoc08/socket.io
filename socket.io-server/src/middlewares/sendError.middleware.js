function sendError(req, res, next) {
    res.onError = (error) => {
        res.status(error.statusCode || 500).send({
            success: false,
            message: error.message,
            statusCode: error.statusCode
        })
    }
    next();
}

module.exports = { sendError }
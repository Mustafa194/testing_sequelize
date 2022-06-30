// Creating a middleware for handling errors in the API
class ApiError {
    static badRequest(err, req, res, next) {
        console.log("Bad Request Error");

        return res.status(400).json({ error: err.message });
    }

    static internal(err, req, res, next) {
        console.log("Internal Server Error");

        next(err);
        return res.status(500).json({ error: err.message });
        // next(err);
    }
}

module.exports = {
    badRequest: ApiError.badRequest,
    internal: ApiError.internal,
};
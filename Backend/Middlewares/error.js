const createError = require('http-errors');

module.exports = {
    notFound: (req, res, next) => {
        next(createError.NotFound('Page Not Found'));
    },

    errorMsg: (err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            error: {
                status: err.status || 500,
                message: err.message
            }
        });
    }
}
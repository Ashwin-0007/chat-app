const AppError = require("../utils/AppError");

const sendErrorDev =(err, res) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const stack = err.stack;
    const message = err.message;
    console.log(err.name, err.message, stack);
    res.status(statusCode).json({
        status,
        message,
        stack
    })
}

const globalErrorHandler = (err, req, res, next) => {
    if(err.name === 'jsonWebTokenError'){
        err = new AppError('Invalid token', 401);
    }
    if(err.name === 'SequelizeValidationError'){
        err = new AppError(err.errors[0].message, 400);
    }
    if(err.name === 'SequelizeDatabaseError'){
        err = new AppError(err.errors[0].message, 400);
    }
    if(err.name === 'SequelizeUniqueConstraintError'){
        err = new AppError(err.errors[0].message, 400);
    }

    if(process.env.NODE_ENV === "development") {
        return sendErrorDev(err, res);
    }
    sendErrorProd(err, res)
};


module.exports = globalErrorHandler;
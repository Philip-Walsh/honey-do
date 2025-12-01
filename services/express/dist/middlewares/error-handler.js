"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const request_error_type_1 = require("./request-error.type");
const http_type_1 = require("./http.type");
function errorHandler(err, req, res, next) {
    const method = req.method;
    const expectedStatus = http_type_1.HttpSuccessStatus[method];
    const statusCode = res.statusCode !== expectedStatus ? res.statusCode : 500;
    const message = `${err.name}: ${err.message}`;
    const response = { message };
    if (err instanceof request_error_type_1.RequestError) {
        res.status(err.status || 419);
    }
    else {
        res.status(500);
        if (process.env.DEPLOYMENT_ENV !== 'production') {
            // TODO: log error in production
            response.stack = err.stack; //?.split('\n');
        }
    }
    response.message = message;
    res.status(statusCode).json(response);
}
//# sourceMappingURL=error-handler.js.map
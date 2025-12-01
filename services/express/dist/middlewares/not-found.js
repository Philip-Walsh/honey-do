"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
const request_error_type_1 = require("./request-error.type");
function notFound(req, res, next) {
    // res.status(404);
    const error = new request_error_type_1.NotFoundError(`404 - Not Found - ${req.originalUrl}`);
    next(error);
}
//# sourceMappingURL=not-found.js.map
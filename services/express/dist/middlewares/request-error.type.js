"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.RequestError = void 0;
class RequestError extends Error {
    status;
    name;
    constructor(message, status, name) {
        super(message);
        this.status = status;
        this.name = this.constructor.name || 'RequestError';
    }
}
exports.RequestError = RequestError;
class NotFoundError extends RequestError {
    constructor(message) {
        const statusCode = 404;
        const defaultMessage = 'Object Not Found';
        super(message || defaultMessage, statusCode);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=request-error.type.js.map
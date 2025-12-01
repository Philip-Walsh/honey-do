"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
const request_error_type_1 = require("./request-error.type");
function validateRequest(validators) {
    return async (req, res, next) => {
        try {
            if (validators.body) {
                req.body = await validators.body.parseAsync(req.body);
            }
            if (validators.params) {
                req.params = await validators.params.parseAsync(req.params);
            }
            if (validators.query) {
                req.query = await validators.query.parseAsync(req.query);
            }
            next();
        }
        catch (error) {
            if (error instanceof request_error_type_1.RequestError) {
                res.status(error.status || 419);
            }
            else {
                res.status(500);
            }
            next(error);
        }
    };
}
//# sourceMappingURL=validate-request.js.map
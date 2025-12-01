"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressCallback = expressCallback;
const http_type_1 = require("./http.type");
function expressCallback(controller) {
    return async (req, res, next) => {
        try {
            const httpRequest = {
                body: req.body,
                query: req.query,
                params: req.params,
                method: req.method,
                path: req.path,
                headers: {
                    'Content-Type': req.get('Content-Type') || '',
                    'User-Agent': req.get('User-Agent') || '',
                },
            };
            const result = await controller(httpRequest);
            console.log({ result });
            const httpStatus = http_type_1.HttpSuccessStatus[httpRequest.method];
            console.log({ httpStatus });
            const headers = {
                'Content-Type': 'application/json',
            };
            res.set(headers);
            res.type('json');
            res.status(httpStatus).send(result);
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=express-callback.js.map
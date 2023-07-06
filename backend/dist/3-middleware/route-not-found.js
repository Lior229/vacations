"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Error_1 = require("../4-models/Error");
function routeNotFound(request, response, next) {
    var err = new Error_1.RouteNotFoundError(request.originalUrl);
    next(err);
}
exports.default = routeNotFound;
//# sourceMappingURL=route-not-found.js.map
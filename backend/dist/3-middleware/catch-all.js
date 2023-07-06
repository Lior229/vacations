"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../2-utils/logger"));
function catchAll(err, request, response, next) {
    // Log the error on the console:
    console.log(err);
    // Log the error to an error log file:
    (0, logger_1.default)(err.message);
    // Send back the error to the front:
    response.status(err.status || 500).send(err.message);
}
exports.default = catchAll;
//# sourceMappingURL=catch-all.js.map
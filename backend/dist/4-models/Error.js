"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.ValidationError = exports.ResourceNotFoundError = exports.RouteNotFoundError = exports.Error = void 0;
var Error = /** @class */ (function () {
    function Error(message, status) {
        this.message = message;
        this.status = status;
    }
    return Error;
}());
exports.Error = Error;
var RouteNotFoundError = /** @class */ (function (_super) {
    __extends(RouteNotFoundError, _super);
    function RouteNotFoundError(route) {
        return _super.call(this, "Route ".concat(route, " not exist"), 404) || this;
    }
    return RouteNotFoundError;
}(Error));
exports.RouteNotFoundError = RouteNotFoundError;
var ResourceNotFoundError = /** @class */ (function (_super) {
    __extends(ResourceNotFoundError, _super);
    function ResourceNotFoundError(id) {
        return _super.call(this, "id ".concat(id, " not exist"), 404) || this;
    }
    return ResourceNotFoundError;
}(Error));
exports.ResourceNotFoundError = ResourceNotFoundError;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message) {
        return _super.call(this, message, 400) || this;
    }
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message) {
        return _super.call(this, message, 401) || this;
    }
    return UnauthorizedError;
}(Error));
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=Error.js.map
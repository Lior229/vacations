"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var catch_all_1 = __importDefault(require("./3-middleware/catch-all"));
var route_not_found_1 = __importDefault(require("./3-middleware/route-not-found"));
var groups_controller_1 = __importDefault(require("./6-controllers/groups-controller"));
var config_1 = __importDefault(require("./config"));
var meeting_controller_1 = __importDefault(require("./6-controllers/meeting-controller"));
var server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use("/api", groups_controller_1.default);
server.use("/api", meeting_controller_1.default);
server.use("*", route_not_found_1.default);
server.use(catch_all_1.default);
server.listen(config_1.default.PORT, function () {
    console.log("listening on http://localhost:".concat(config_1.default.PORT));
});
//# sourceMappingURL=app.js.map
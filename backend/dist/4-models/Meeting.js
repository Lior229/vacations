"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var Meeting = /** @class */ (function () {
    function Meeting(meeting) {
        this.id = meeting.id;
        this.groupId = meeting.groupId;
        this.startMeeting = meeting.startMeeting;
        this.endMeeting = meeting.endMeeting;
        this.meetingDes = meeting.meetingDes;
        this.room = meeting.room;
    }
    Meeting.prototype.validate = function () {
        var _a;
        var result = Meeting.validationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    Meeting.validationSchema = joi_1.default.object({
        id: joi_1.default.number().integer().positive().optional(),
        groupId: joi_1.default.number().integer().positive().required(),
        startMeeting: joi_1.default.date().required(),
        endMeeting: joi_1.default.date().required(),
        meetingDes: joi_1.default.string().required().min(1).max(1000),
        room: joi_1.default.string().required().min(1).max(45),
    });
    return Meeting;
}());
exports.default = Meeting;
//# sourceMappingURL=Meeting.js.map
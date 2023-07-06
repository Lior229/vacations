"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var Error_1 = require("../4-models/Error");
var config_1 = __importDefault(require("../config"));
var DB_DATABASE = config_1.default.DB_DATABASE, DB_HOST = config_1.default.DB_HOST, DB_USER = config_1.default.DB_USER, DB_PASSWORD = config_1.default.DB_PASSWORD;
//Create a connection pool to MySQL
var connection = mysql_1.default.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
});
var execute = function (sqlQuery) {
    return new Promise(function (resolve, reject) {
        connection.query(sqlQuery, function (err, result) {
            if (err) {
                reject(new Error_1.Error(err.sqlMessage || 'sql error', 500));
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.default = {
    execute: execute
};
//# sourceMappingURL=dal.js.map
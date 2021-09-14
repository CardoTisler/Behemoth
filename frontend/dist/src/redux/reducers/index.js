"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var categoryReducer_1 = __importDefault(require("./categoryReducer"));
var transactionReducer_1 = __importDefault(require("./transactionReducer"));
var errorReducer_1 = __importDefault(require("./errorReducer"));
var successReducer_1 = __importDefault(require("./successReducer"));
var allReducers = (0, redux_1.combineReducers)({
    transactionReducer: transactionReducer_1.default,
    categoryReducer: categoryReducer_1.default,
    errorReducer: errorReducer_1.default,
    successReducer: successReducer_1.default
});
exports.default = allReducers;

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@material-ui/core");
var TransactionsHeader_1 = __importDefault(require("./TransactionsHeader"));
var TransactionsRow_1 = __importDefault(require("./TransactionsRow"));
var react_redux_1 = require("react-redux");
var TransactionsList = function () {
    var transactionsList = (0, react_redux_1.useSelector)(function (state) { return state.transactionReducer; });
    var renderRows = function () {
        return (transactionsList.map(function (element) {
            return ((0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12 }, { children: (0, jsx_runtime_1.jsx)(TransactionsRow_1.default, { data: element }, void 0) }), element._id));
        }));
    };
    return ((0, jsx_runtime_1.jsxs)(core_1.Grid, __assign({ container: true, spacing: 1 }, { children: [(0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12 }, { children: (0, jsx_runtime_1.jsx)(TransactionsHeader_1.default, {}, void 0) }), void 0), renderRows()] }), void 0));
};
exports.default = TransactionsList;

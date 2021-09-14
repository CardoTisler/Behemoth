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
var CategoryList_1 = __importDefault(require("./CategoryList"));
var CategoryForm_1 = __importDefault(require("./CategoryForm"));
var react_redux_1 = require("react-redux");
var Categories = function () {
    var _a = (0, react_redux_1.useSelector)(function (state) { return state.categoryReducer; }), incomeCategories = _a.incomeCategories, expenseCategories = _a.expenseCategories;
    return ((0, jsx_runtime_1.jsxs)(core_1.Grid, __assign({ container: true, spacing: 3 }, { children: [(0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, md: 12 }, { children: (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ container: true, spacing: 3 }, { children: (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, md: 6 }, { children: (0, jsx_runtime_1.jsx)(CategoryForm_1.default, {}, void 0) }), void 0) }), void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, md: 6 }, { children: (0, jsx_runtime_1.jsx)(CategoryList_1.default, { listTitle: 'Income Categories', listArr: incomeCategories }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, md: 6 }, { children: (0, jsx_runtime_1.jsx)(CategoryList_1.default, { listTitle: 'Expenses Categories', listArr: expenseCategories }, void 0) }), void 0)] }), void 0));
};
exports.default = Categories;

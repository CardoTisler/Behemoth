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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryReducer = void 0;
var defaultCategory = {
    type: '',
    category: '',
    budget: 0,
    _id: ''
};
var initialState = {
    incomeCategories: [],
    expenseCategories: [],
    noneCategory: defaultCategory
};
var categoryReducer = function (state, action) {
    if (state === void 0) { state = __assign({}, initialState); }
    switch (action.type) {
        default:
            return __assign({}, state);
        case 'LOAD_CATEGORIES':
            return __assign(__assign({}, initialState), action.payload);
        case 'GET_CATEGORIES':
            return __assign({}, state);
        case 'DELETE_CATEGORY':
            return __assign(__assign({}, state), { incomeCategories: state.incomeCategories.filter(function (category) { return category._id !== action.payload.category_id; }), expenseCategories: state.expenseCategories.filter(function (category) { return category._id !== action.payload.category_id; }) });
        case 'ADD_INCOME_CATEGORY':
            return __assign(__assign({}, state), { incomeCategories: __spreadArray(__spreadArray([], state.incomeCategories, true), [action.payload.newCategory], false) });
        case 'ADD_EXPENSE_CATEGORY':
            return __assign(__assign({}, state), { expenseCategories: __spreadArray(__spreadArray([], state.expenseCategories, true), [action.payload.newCategory], false) });
    }
};
exports.categoryReducer = categoryReducer;
exports.default = exports.categoryReducer;

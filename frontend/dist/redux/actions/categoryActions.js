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
//TODO: Make sure categories and transactions actions always return same object
var defaultNone = {
    type: '',
    category: '',
    budget: 0,
    _id: ''
};
var defaultPayload = {
    category_id: '',
    newCategory: defaultNone,
    allCategories: {
        incomeCategories: [],
        expenseCategories: [],
        noneCategory: defaultNone
    }
};
export var getCategories = function () {
    return {
        type: 'GET_TRANSACTIONS',
        payload: __assign({}, defaultPayload)
    };
};
export var loadCategories = function (allCategories) {
    return {
        type: 'LOAD_CATEGORIES',
        payload: __assign(__assign({}, defaultPayload), { allCategories: __assign({}, allCategories) })
    };
};
export var deleteCategory = function (category_id) {
    return {
        type: 'DELETE_CATEGORY',
        payload: __assign(__assign({}, defaultPayload), { category_id: category_id })
    };
};
export var addCategory = function (newCategory, isIncomeCategory) {
    var type = isIncomeCategory ? 'ADD_INCOME_CATEGORY' : 'ADD_EXPENSE_CATEGORY';
    return {
        type: type,
        payload: __assign(__assign({}, defaultPayload), { newCategory: newCategory })
    };
};

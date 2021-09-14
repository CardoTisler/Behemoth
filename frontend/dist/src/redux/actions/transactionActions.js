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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTransactions = exports.updateTransactionsCategory = exports.getTransactions = void 0;
var payload = {
    transactionName: '',
    newCategoryId: '',
    allTransactions: []
};
var getTransactions = function () {
    return {
        type: 'GET_TRANSACTIONS',
        payload: __assign({}, payload)
    };
};
exports.getTransactions = getTransactions;
//transactionIdentifier - name field of transactions that we want to change
//newCategoryId - id of the new category that was applied to the corresponding transactions
var updateTransactionsCategory = function (transactionName, newCategoryId) {
    return {
        type: 'UPDATE_TRANSACTIONS_CAT',
        payload: __assign(__assign({}, payload), { transactionName: transactionName, newCategoryId: newCategoryId })
    };
};
exports.updateTransactionsCategory = updateTransactionsCategory;
var loadTransactions = function (allTransactions) {
    return {
        type: 'LOAD_TRANSACTIONS',
        payload: __assign(__assign({}, payload), { allTransactions: allTransactions })
    };
};
exports.loadTransactions = loadTransactions;

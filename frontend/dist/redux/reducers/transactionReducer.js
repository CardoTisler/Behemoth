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
var defaultState = [];
var transactionReducer = function (state, action) {
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        default:
            return __spreadArray(__spreadArray([], state, true), defaultState, true); //this is probably redundant
        case 'LOAD_TRANSACTIONS':
            return __spreadArray(__spreadArray([], action.payload.allTransactions, true), state, true);
        case 'GET_TRANSACTIONS':
            return __spreadArray([], state, true);
        case 'UPDATE_TRANSACTIONS_CAT':
            var name_1 = action.payload.transactionName;
            var newCategoryId_1 = action.payload.newCategoryId; //the exclamation mark tells TypeScript it can trust that this will not be undefined.
            //for some reason it thinks it can be undefined even tho action UDPATE does not let anything but string value in.
            var updatedTransactions = state.map(function (transaction) {
                if (transaction.name === name_1) {
                    return __assign(__assign({}, transaction), { category: newCategoryId_1 });
                }
                return __assign({}, transaction);
            });
            return updatedTransactions;
    }
};
export default transactionReducer;

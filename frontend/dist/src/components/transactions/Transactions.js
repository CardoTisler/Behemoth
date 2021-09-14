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
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var TransactionsSearch_1 = __importDefault(require("./TransactionsSearch"));
var TransactionsList_1 = __importDefault(require("./TransactionsList"));
var TransactionsForm_1 = __importDefault(require("./TransactionsForm"));
var react_redux_1 = require("react-redux");
var transactionActions_1 = require("../../redux/actions/transactionActions");
var useFetchTransactions_1 = require("../../hooks/useFetchTransactions");
var errorActions_1 = require("../../redux/actions/errorActions");
//TODO: if rendering positive or 0 number to amount column, font green, otherwise red 
var useStyles = (0, core_1.makeStyles)({
    root: {
        padding: '0.7rem'
    }
});
var Transactions = function () {
    var classes = useStyles();
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = (0, useFetchTransactions_1.useFetchTransactions)(), transactionsList = _a.transactionsList, error = _a.error;
    (0, react_1.useEffect)(function () {
        if (!error) {
            dispatch((0, transactionActions_1.loadTransactions)(transactionsList));
        }
        else {
            dispatch((0, errorActions_1.showError)('Can not render transactions!', error));
        }
    }, [transactionsList, error]);
    return ((0, jsx_runtime_1.jsx)(core_1.Box, __assign({ boxShadow: 2, className: classes.root }, { children: (0, jsx_runtime_1.jsxs)(core_1.Grid, __assign({ container: true, spacing: 1 }, { children: [(0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12 }, { children: (0, jsx_runtime_1.jsx)(TransactionsForm_1.default, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12 }, { children: (0, jsx_runtime_1.jsx)(TransactionsSearch_1.default, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(TransactionsList_1.default, {}, void 0)] }), void 0) }), void 0));
};
exports.default = Transactions;

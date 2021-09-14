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
var Search_1 = __importDefault(require("@material-ui/icons/Search"));
var react_1 = require("react");
var useStyles = (0, core_1.makeStyles)({
    root: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0.5rem'
    }, searchBar: {
        width: '100%'
    }, searchIcon: {
        width: '50px',
        textAlign: 'center',
        alignSelf: 'center'
    }
});
var TransactionsSearch = function () {
    var classes = useStyles();
    var _a = (0, react_1.useState)(''), searchInput = _a[0], setSearchInput = _a[1];
    var handleInput = function (e) {
        setSearchInput(e.target.value);
        //TODO: Add sleep timeout (0.5 sec perhaps) after that start running the filtering method
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: classes.root }, { children: [(0, jsx_runtime_1.jsx)(core_1.TextField, { id: 'filled-basic', label: 'Search Transactions', name: 'transactionSearchField', onChange: handleInput, value: searchInput, className: classes.searchBar }, void 0), (0, jsx_runtime_1.jsx)("div", __assign({ className: classes.searchIcon }, { children: (0, jsx_runtime_1.jsx)(Search_1.default, {}, void 0) }), void 0)] }), void 0));
};
exports.default = TransactionsSearch;

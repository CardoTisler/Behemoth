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
var core_2 = require("@material-ui/core");
var RowDropdown_1 = __importDefault(require("./RowDropdown"));
var useStyles = (0, core_2.makeStyles)({
    root: {
        textAlign: 'center'
    }
});
var TransactionsRow = function (props) {
    var _a = props.data, date = _a.date, name = _a.name, text = _a.text, amount = _a.amount, category = _a.category, _id = _a._id;
    var classes = useStyles();
    return ((0, jsx_runtime_1.jsxs)(core_1.Grid, __assign({ container: true, className: classes.root }, { children: [(0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 2 }, { children: (0, jsx_runtime_1.jsx)("p", { children: date }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 2 }, { children: (0, jsx_runtime_1.jsx)("p", { children: name }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 6 }, { children: (0, jsx_runtime_1.jsx)("p", { children: text }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 1 }, { children: (0, jsx_runtime_1.jsx)("p", { children: amount }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 1 }, { children: (0, jsx_runtime_1.jsx)(RowDropdown_1.default, { transactionCategoryId: category, transactionName: name, transactionId: _id }, void 0) }), void 0)] }), void 0));
};
exports.default = TransactionsRow;

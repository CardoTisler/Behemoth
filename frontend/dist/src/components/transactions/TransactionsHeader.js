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
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@material-ui/core");
var useStyles = (0, core_1.makeStyles)({
    root: {
        border: 'solid',
        borderWidth: '1px',
        textAlign: 'center'
    }
});
var TransactionsHeader = function () {
    var classes = useStyles();
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(core_1.Grid, __assign({ container: true }, { children: [(0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 2, className: classes.root }, { children: (0, jsx_runtime_1.jsx)("p", { children: "Date" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 2, className: classes.root }, { children: (0, jsx_runtime_1.jsx)("p", { children: "Name" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 6, className: classes.root }, { children: (0, jsx_runtime_1.jsx)("p", { children: "Description" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 1, className: classes.root }, { children: (0, jsx_runtime_1.jsx)("p", { children: "Amount" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 1, className: classes.root }, { children: (0, jsx_runtime_1.jsx)("p", { children: "Category" }, void 0) }), void 0)] }), void 0) }, void 0));
};
exports.default = TransactionsHeader;

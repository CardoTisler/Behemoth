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
var SummaryElement_1 = __importDefault(require("./SummaryElement"));
var core_1 = require("@material-ui/core");
var core_2 = require("@material-ui/core");
var AttachMoney_1 = __importDefault(require("@material-ui/icons/AttachMoney"));
var TrendingDown_1 = __importDefault(require("@material-ui/icons/TrendingDown"));
var TrendingUp_1 = __importDefault(require("@material-ui/icons/TrendingUp"));
var AccountBalanceWallet_1 = __importDefault(require("@material-ui/icons/AccountBalanceWallet"));
var useStyles = (0, core_2.makeStyles)({
    root: {
        width: '25%',
        marginRight: '5%',
        padding: 10,
        border: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        alignContent: 'center'
    }
});
var SummaryPanels = function () {
    var classes = useStyles();
    return ((0, jsx_runtime_1.jsxs)(core_1.Grid, __assign({ container: true, spacing: 3, className: classes.root }, { children: [(0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, md: 6 }, { children: (0, jsx_runtime_1.jsx)(SummaryElement_1.default, { text: 'Income', icon: (0, jsx_runtime_1.jsx)(AttachMoney_1.default, {}, void 0), value: '700\u20AC' }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, md: 6 }, { children: (0, jsx_runtime_1.jsx)(SummaryElement_1.default, { text: 'Expenses', icon: (0, jsx_runtime_1.jsx)(TrendingDown_1.default, {}, void 0), value: '500\u20AC' }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, md: 6 }, { children: (0, jsx_runtime_1.jsx)(SummaryElement_1.default, { text: 'Budget', icon: (0, jsx_runtime_1.jsx)(AccountBalanceWallet_1.default, {}, void 0), value: '500\u20AC/650\u20AC' }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, md: 6 }, { children: (0, jsx_runtime_1.jsx)(SummaryElement_1.default, { text: 'Savings', icon: (0, jsx_runtime_1.jsx)(TrendingUp_1.default, {}, void 0), value: '1122\u20AC' }, void 0) }), void 0)] }), void 0));
};
exports.default = SummaryPanels;

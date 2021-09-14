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
var DateFilter_1 = __importDefault(require("./DateFilter"));
var SummaryPanels_1 = __importDefault(require("./SummaryPanels"));
var core_1 = require("@material-ui/core");
var Graph_1 = __importDefault(require("./Graph"));
var useStyles = (0, core_1.makeStyles)({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        border: 'solid',
        borderWidth: '1px',
        borderColor: 'white',
        textAlign: 'center',
        width: '100%',
        padding: '20px',
    },
    header: {
        display: 'flex',
        flexDirection: 'row'
    }
});
var Dashboard = function () {
    var classes = useStyles();
    return ((0, jsx_runtime_1.jsxs)(core_1.Box, __assign({ className: classes.root, boxShadow: 4 }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: classes.header }, { children: [(0, jsx_runtime_1.jsx)(SummaryPanels_1.default, {}, void 0), (0, jsx_runtime_1.jsx)(DateFilter_1.default, {}, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(Graph_1.default, {}, void 0)] }), void 0));
};
exports.default = Dashboard;

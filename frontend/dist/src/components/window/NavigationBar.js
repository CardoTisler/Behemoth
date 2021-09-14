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
//TODO: Remove the red line below button text, appears after clicking on button
//TODO: Add highlight to currently selected button
var NavButton_1 = __importDefault(require("./NavButton"));
var styles_1 = require("@material-ui/core/styles");
var react_router_dom_1 = require("react-router-dom");
var Dashboard_1 = __importDefault(require("@material-ui/icons/Dashboard"));
var SyncAlt_1 = __importDefault(require("@material-ui/icons/SyncAlt"));
var LocalAtm_1 = __importDefault(require("@material-ui/icons/LocalAtm"));
var BarChart_1 = __importDefault(require("@material-ui/icons/BarChart"));
var core_1 = require("@material-ui/core");
var useStyles = (0, styles_1.makeStyles)({
    root: {
        background: 'linear-gradient(180deg , #3f51b5 30%, rgb(0 0 0 / 0%) 100%)',
        height: '80vh',
        width: '10%'
    }
});
var NavigationBar = function (props) {
    var classes = useStyles();
    return ((0, jsx_runtime_1.jsx)("nav", __assign({ className: classes.root }, { children: (0, jsx_runtime_1.jsxs)(core_1.Grid, __assign({ container: true, spacing: 0 }, { children: [(0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, md: 12 }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/" }, { children: (0, jsx_runtime_1.jsx)(NavButton_1.default, { text: 'Dashboard', icon: (0, jsx_runtime_1.jsx)(Dashboard_1.default, {}, void 0), onClick: props.onButtonClick }, void 0) }), void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, md: 12 }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/transactions" }, { children: (0, jsx_runtime_1.jsx)(NavButton_1.default, { text: 'Transactions', icon: (0, jsx_runtime_1.jsx)(SyncAlt_1.default, {}, void 0), onClick: props.onButtonClick }, void 0) }), void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, md: 12 }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: '/categories' }, { children: (0, jsx_runtime_1.jsx)(NavButton_1.default, { text: 'Categories', icon: (0, jsx_runtime_1.jsx)(LocalAtm_1.default, {}, void 0), onClick: props.onButtonClick }, void 0) }), void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, md: 12 }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: '/reports' }, { children: (0, jsx_runtime_1.jsx)(NavButton_1.default, { text: 'Reports', icon: (0, jsx_runtime_1.jsx)(BarChart_1.default, {}, void 0), onClick: props.onButtonClick }, void 0) }), void 0) }), void 0)] }), void 0) }), void 0));
};
exports.default = NavigationBar;

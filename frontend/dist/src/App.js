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
require("./App.css");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Banner_1 = __importDefault(require("./components/window/Banner"));
var NavigationBar_1 = __importDefault(require("./components/window/NavigationBar"));
var Dashboard_1 = __importDefault(require("./components/dashboard/Dashboard"));
var Transactions_1 = __importDefault(require("./components/transactions/Transactions"));
var Categories_1 = __importDefault(require("./components/categories/Categories"));
var Reports_1 = __importDefault(require("./components/reports/Reports"));
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var categoryActions_1 = require("./redux/actions/categoryActions");
var useFetchCategories_1 = require("./hooks/useFetchCategories");
var ErrorToolbar_1 = __importDefault(require("./components/info/ErrorToolbar"));
var SuccessToolbar_1 = __importDefault(require("./components/info/SuccessToolbar"));
var useStyles = (0, core_1.makeStyles)({
    root: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
    }, frameStyles: {
        margin: '3rem',
        width: '100%'
    }, content: {
        flexDirection: 'row',
        display: 'flex'
    }
});
function App() {
    var classes = useStyles();
    var _a = (0, react_1.useState)('Dashboard'), bannerTitle = _a[0], setBannerTitle = _a[1];
    var handleBannerText = function (props) { setBannerTitle(props.text); };
    var dispatch = (0, react_redux_1.useDispatch)();
    var fetchData = (0, useFetchCategories_1.useFetchCategories)();
    var _b = fetchData.allCategories, incomeCategories = _b.incomeCategories, expenseCategories = _b.expenseCategories, noneCategory = _b.noneCategory;
    var error = fetchData.error;
    (0, react_1.useEffect)(function () {
        if (!error) {
            dispatch((0, categoryActions_1.loadCategories)({
                incomeCategories: incomeCategories,
                expenseCategories: expenseCategories,
                noneCategory: noneCategory
            }));
        }
    }, [incomeCategories]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: classes.root }, { children: [(0, jsx_runtime_1.jsx)(Banner_1.default, { title: bannerTitle }, void 0), (0, jsx_runtime_1.jsx)("div", __assign({ className: classes.content }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [(0, jsx_runtime_1.jsx)(NavigationBar_1.default, { onButtonClick: function () { return handleBannerText; } }, void 0), (0, jsx_runtime_1.jsxs)("div", __assign({ className: classes.frameStyles }, { children: [(0, jsx_runtime_1.jsx)(ErrorToolbar_1.default, {}, void 0), (0, jsx_runtime_1.jsx)(SuccessToolbar_1.default, {}, void 0), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Switch, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: '/', component: Dashboard_1.default }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: '/transactions', render: function () {
                                                return (0, jsx_runtime_1.jsx)(Transactions_1.default, {}, void 0);
                                            } }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: '/categories', render: function () {
                                                return (0, jsx_runtime_1.jsx)(Categories_1.default, {}, void 0);
                                            } }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: '/reports', component: Reports_1.default }, void 0)] }, void 0)] }), void 0)] }, void 0) }), void 0)] }), void 0));
}
exports.default = App;

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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Banner from './components/window/Banner';
import NavigationBar from './components/window/NavigationBar';
import Dashboard from './components/dashboard/Dashboard';
import Transactions from './components/transactions/Transactions';
import Categories from './components/categories/Categories';
import Reports from './components/reports/Reports';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { loadCategories } from './redux/actions/categoryActions';
import { useFetchCategories } from './hooks/useFetchCategories';
import ErrorToolbar from './components/info/ErrorToolbar';
import SuccessToolbar from './components/info/SuccessToolbar';
var useStyles = makeStyles({
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
    var _a = useState('Dashboard'), bannerTitle = _a[0], setBannerTitle = _a[1];
    var handleBannerText = function (props) { setBannerTitle(props.text); };
    var dispatch = useDispatch();
    var fetchData = useFetchCategories();
    var _b = fetchData.allCategories, incomeCategories = _b.incomeCategories, expenseCategories = _b.expenseCategories, noneCategory = _b.noneCategory;
    var error = fetchData.error;
    useEffect(function () {
        if (!error) {
            dispatch(loadCategories({
                incomeCategories: incomeCategories,
                expenseCategories: expenseCategories,
                noneCategory: noneCategory
            }));
        }
    }, [incomeCategories]);
    return (_jsxs("div", __assign({ className: classes.root }, { children: [_jsx(Banner, { title: bannerTitle }, void 0), _jsx("div", __assign({ className: classes.content }, { children: _jsxs(Router, { children: [_jsx(NavigationBar, { onButtonClick: function () { return handleBannerText; } }, void 0), _jsxs("div", __assign({ className: classes.frameStyles }, { children: [_jsx(ErrorToolbar, {}, void 0), _jsx(SuccessToolbar, {}, void 0), _jsxs(Switch, { children: [_jsx(Route, { exact: true, path: '/', component: Dashboard }, void 0), _jsx(Route, { exact: true, path: '/transactions', render: function () {
                                                return _jsx(Transactions, {}, void 0);
                                            } }, void 0), _jsx(Route, { exact: true, path: '/categories', render: function () {
                                                return _jsx(Categories, {}, void 0);
                                            } }, void 0), _jsx(Route, { exact: true, path: '/reports', component: Reports }, void 0)] }, void 0)] }), void 0)] }, void 0) }), void 0)] }), void 0));
}
export default App;

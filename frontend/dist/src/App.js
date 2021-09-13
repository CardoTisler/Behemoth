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
import { showError } from './redux/actions/errorActions';
const useStyles = makeStyles({
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
    const classes = useStyles();
    const [bannerTitle, setBannerTitle] = useState('Dashboard');
    const handleBannerText = (props) => { setBannerTitle(props.text); };
    const dispatch = useDispatch();
    const { incomeCategories, expenseCategories, noneCategory, error } = useFetchCategories();
    useEffect(() => {
        if (!error) {
            dispatch(loadCategories({
                incomeCategories,
                expenseCategories,
                noneCategory
            }));
        }
        else {
            dispatch(showError(`Error loading in categories.`, error.message));
        }
    }, [incomeCategories]);
    return (_jsxs("div", Object.assign({ className: classes.root }, { children: [_jsx(Banner, { title: bannerTitle }, void 0), _jsx("div", Object.assign({ className: classes.content }, { children: _jsxs(Router, { children: [_jsx(NavigationBar, { onButtonClick: handleBannerText }, void 0), _jsxs("div", Object.assign({ className: classes.frameStyles }, { children: [_jsx(ErrorToolbar, {}, void 0), _jsx(SuccessToolbar, {}, void 0), _jsxs(Switch, { children: [_jsx(Route, { exact: true, path: '/', component: Dashboard }, void 0), _jsx(Route, { exact: true, path: '/transactions', render: () => _jsx(Transactions, {}, void 0) }, void 0), _jsx(Route, { exact: true, path: '/categories', render: () => _jsx(Categories, {}, void 0) }, void 0), _jsx(Route, { exact: true, path: '/reports', component: Reports }, void 0)] }, void 0)] }), void 0)] }, void 0) }), void 0)] }), void 0));
}
export default App;

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
//TODO: Remove the red line below button text, appears after clicking on button
//TODO: Add highlight to currently selected button
import NavButton from './NavButton';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import BarChartIcon from '@material-ui/icons/BarChart';
import { Grid } from '@material-ui/core';
var useStyles = makeStyles({
    root: {
        background: 'linear-gradient(180deg , #3f51b5 30%, rgb(0 0 0 / 0%) 100%)',
        height: '80vh',
        width: '10%'
    }
});
var NavigationBar = function (props) {
    var classes = useStyles();
    return (_jsx("nav", __assign({ className: classes.root }, { children: _jsxs(Grid, __assign({ container: true, spacing: 0 }, { children: [_jsx(Grid, __assign({ item: true, xs: 12, md: 12 }, { children: _jsx(Link, __assign({ to: "/" }, { children: _jsx(NavButton, { text: 'Dashboard', icon: _jsx(DashboardIcon, {}, void 0), onClick: props.onButtonClick }, void 0) }), void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 12, md: 12 }, { children: _jsx(Link, __assign({ to: "/transactions" }, { children: _jsx(NavButton, { text: 'Transactions', icon: _jsx(SyncAltIcon, {}, void 0), onClick: props.onButtonClick }, void 0) }), void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 12, md: 12 }, { children: _jsx(Link, __assign({ to: '/categories' }, { children: _jsx(NavButton, { text: 'Categories', icon: _jsx(LocalAtmIcon, {}, void 0), onClick: props.onButtonClick }, void 0) }), void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 12, md: 12 }, { children: _jsx(Link, __assign({ to: '/reports' }, { children: _jsx(NavButton, { text: 'Reports', icon: _jsx(BarChartIcon, {}, void 0), onClick: props.onButtonClick }, void 0) }), void 0) }), void 0)] }), void 0) }), void 0));
};
export default NavigationBar;

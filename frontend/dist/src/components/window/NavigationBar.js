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
const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(180deg , #3f51b5 30%, rgb(0 0 0 / 0%) 100%)',
        height: '80vh',
        width: '10%'
    }
});
const NavigationBar = (props) => {
    const classes = useStyles();
    return (_jsx("nav", Object.assign({ className: classes.root }, { children: _jsxs(Grid, Object.assign({ container: true, spacing: 0 }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 12, md: 12 }, { children: _jsx(Link, Object.assign({ to: "/" }, { children: _jsx(NavButton, { text: 'Dashboard', icon: _jsx(DashboardIcon, {}, void 0), onClick: props.onButtonClick }, void 0) }), void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 12, md: 12 }, { children: _jsx(Link, Object.assign({ to: "/transactions" }, { children: _jsx(NavButton, { text: 'Transactions', icon: _jsx(SyncAltIcon, {}, void 0), onClick: props.onButtonClick }, void 0) }), void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 12, md: 12 }, { children: _jsx(Link, Object.assign({ to: '/categories' }, { children: _jsx(NavButton, { text: 'Categories', icon: _jsx(LocalAtmIcon, {}, void 0), onClick: props.onButtonClick }, void 0) }), void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 12, md: 12 }, { children: _jsx(Link, Object.assign({ to: '/reports' }, { children: _jsx(NavButton, { text: 'Reports', icon: _jsx(BarChartIcon, {}, void 0), onClick: props.onButtonClick }, void 0) }), void 0) }), void 0)] }), void 0) }), void 0));
};
export default NavigationBar;

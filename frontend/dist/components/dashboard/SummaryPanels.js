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
import SummaryElement from './SummaryElement';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
var useStyles = makeStyles({
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
    return (_jsxs(Grid, __assign({ container: true, spacing: 3, className: classes.root }, { children: [_jsx(Grid, __assign({ item: true, xs: 12, md: 6 }, { children: _jsx(SummaryElement, { text: 'Income', icon: _jsx(AttachMoneyIcon, {}, void 0), value: '700\u20AC' }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 12, md: 6 }, { children: _jsx(SummaryElement, { text: 'Expenses', icon: _jsx(TrendingDownIcon, {}, void 0), value: '500\u20AC' }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 12, md: 6 }, { children: _jsx(SummaryElement, { text: 'Budget', icon: _jsx(AccountBalanceWalletIcon, {}, void 0), value: '500\u20AC/650\u20AC' }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 12, md: 6 }, { children: _jsx(SummaryElement, { text: 'Savings', icon: _jsx(TrendingUpIcon, {}, void 0), value: '1122\u20AC' }, void 0) }), void 0)] }), void 0));
};
export default SummaryPanels;

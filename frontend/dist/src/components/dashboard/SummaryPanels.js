import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SummaryElement from './SummaryElement';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
const useStyles = makeStyles({
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
const SummaryPanels = () => {
    const classes = useStyles();
    return (_jsxs(Grid, Object.assign({ container: true, spacing: 3, className: classes.root }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 12, md: 6 }, { children: _jsx(SummaryElement, { text: 'Income', icon: _jsx(AttachMoneyIcon, {}, void 0), value: '700\u20AC' }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 12, md: 6 }, { children: _jsx(SummaryElement, { text: 'Expenses', icon: _jsx(TrendingDownIcon, {}, void 0), value: '500\u20AC' }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 12, md: 6 }, { children: _jsx(SummaryElement, { text: 'Budget', icon: _jsx(AccountBalanceWalletIcon, {}, void 0), value: '500\u20AC/650\u20AC' }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 12, md: 6 }, { children: _jsx(SummaryElement, { text: 'Savings', icon: _jsx(TrendingUpIcon, {}, void 0), value: '1122\u20AC' }, void 0) }), void 0)] }), void 0));
};
export default SummaryPanels;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles, Grid } from '@material-ui/core';
const useStyles = makeStyles({
    root: {
        border: 'solid',
        borderWidth: '1px',
        textAlign: 'center'
    }
});
const TransactionsHeader = () => {
    const classes = useStyles();
    return (_jsx("div", { children: _jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 2, className: classes.root }, { children: _jsx("p", { children: "Date" }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 2, className: classes.root }, { children: _jsx("p", { children: "Name" }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 6, className: classes.root }, { children: _jsx("p", { children: "Description" }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 1, className: classes.root }, { children: _jsx("p", { children: "Amount" }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 1, className: classes.root }, { children: _jsx("p", { children: "Category" }, void 0) }), void 0)] }), void 0) }, void 0));
};
export default TransactionsHeader;

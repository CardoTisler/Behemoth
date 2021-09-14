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
import { makeStyles, Grid } from '@material-ui/core';
var useStyles = makeStyles({
    root: {
        border: 'solid',
        borderWidth: '1px',
        textAlign: 'center'
    }
});
var TransactionsHeader = function () {
    var classes = useStyles();
    return (_jsx("div", { children: _jsxs(Grid, __assign({ container: true }, { children: [_jsx(Grid, __assign({ item: true, xs: 2, className: classes.root }, { children: _jsx("p", { children: "Date" }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 2, className: classes.root }, { children: _jsx("p", { children: "Name" }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 6, className: classes.root }, { children: _jsx("p", { children: "Description" }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 1, className: classes.root }, { children: _jsx("p", { children: "Amount" }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 1, className: classes.root }, { children: _jsx("p", { children: "Category" }, void 0) }), void 0)] }), void 0) }, void 0));
};
export default TransactionsHeader;

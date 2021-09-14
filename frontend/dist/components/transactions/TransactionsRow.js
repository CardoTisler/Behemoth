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
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import RowDropdown from './RowDropdown';
var useStyles = makeStyles({
    root: {
        textAlign: 'center'
    }
});
var TransactionsRow = function (props) {
    var _a = props.data, date = _a.date, name = _a.name, text = _a.text, amount = _a.amount, category = _a.category, _id = _a._id;
    var classes = useStyles();
    return (_jsxs(Grid, __assign({ container: true, className: classes.root }, { children: [_jsx(Grid, __assign({ item: true, xs: 2 }, { children: _jsx("p", { children: date }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 2 }, { children: _jsx("p", { children: name }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 6 }, { children: _jsx("p", { children: text }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 1 }, { children: _jsx("p", { children: amount }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 1 }, { children: _jsx(RowDropdown, { transactionCategoryId: category, transactionName: name, transactionId: _id }, void 0) }), void 0)] }), void 0));
};
export default TransactionsRow;

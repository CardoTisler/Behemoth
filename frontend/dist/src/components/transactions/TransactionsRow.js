import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import RowDropdown from './RowDropdown';
const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    }
});
const TransactionsRow = (props) => {
    const { date, name, text, amount, category, _id } = props.data;
    const classes = useStyles();
    return (_jsxs(Grid, Object.assign({ container: true, className: classes.root }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 2 }, { children: _jsx("p", { children: date }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 2 }, { children: _jsx("p", { children: name }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 6 }, { children: _jsx("p", { children: text }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 1 }, { children: _jsx("p", { children: amount }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 1 }, { children: _jsx(RowDropdown, { transactionCategoryId: category, transactionName: name, transactionId: _id }, void 0) }), void 0)] }), void 0));
};
export default TransactionsRow;

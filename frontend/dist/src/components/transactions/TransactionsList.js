import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid } from '@material-ui/core';
import TransactionsHeader from './TransactionsHeader';
import TransactionsRow from './TransactionsRow';
import { useSelector } from 'react-redux';
const TransactionsList = () => {
    const transactionsList = useSelector((state) => state.transactionReducer);
    const renderRows = () => {
        return (transactionsList.map((element) => {
            return (_jsx(Grid, Object.assign({ item: true, xs: 12 }, { children: _jsx(TransactionsRow, { data: element }, void 0) }), element._id));
        }));
    };
    return (_jsxs(Grid, Object.assign({ container: true, spacing: 1 }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 12 }, { children: _jsx(TransactionsHeader, {}, void 0) }), void 0), renderRows()] }), void 0));
};
export default TransactionsList;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { makeStyles, Grid, Box } from '@material-ui/core';
import TransactionsSearch from './TransactionsSearch';
import TransactionsList from './TransactionsList';
import TransactionsForm from './TransactionsForm';
import { useDispatch } from 'react-redux';
import { loadTransactions } from '../../redux/actions/transactionActions';
import { useFetchTransactions } from '../../hooks/useFetchTransactions';
import { showError } from '../../redux/actions/errorActions';
//TODO: if rendering positive or 0 number to amount column, font green, otherwise red 
const useStyles = makeStyles({
    root: {
        padding: '0.7rem'
    }
});
const Transactions = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { transactionsList, error } = useFetchTransactions();
    useEffect(() => {
        if (!error) {
            dispatch(loadTransactions(transactionsList));
        }
        else {
            dispatch(showError('Can not render transactions!', error));
        }
    }, [transactionsList, error]);
    return (_jsx(Box, Object.assign({ boxShadow: 2, className: classes.root }, { children: _jsxs(Grid, Object.assign({ container: true, spacing: 1 }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 12 }, { children: _jsx(TransactionsForm, {}, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 12 }, { children: _jsx(TransactionsSearch, {}, void 0) }), void 0), _jsx(TransactionsList, {}, void 0)] }), void 0) }), void 0));
};
export default Transactions;

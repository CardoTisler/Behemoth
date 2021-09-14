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
var useStyles = makeStyles({
    root: {
        padding: '0.7rem'
    }
});
var Transactions = function () {
    var classes = useStyles();
    var dispatch = useDispatch();
    var _a = useFetchTransactions(), transactionsList = _a.transactionsList, error = _a.error;
    useEffect(function () {
        if (!error) {
            dispatch(loadTransactions(transactionsList));
        }
        else {
            dispatch(showError('Can not render transactions!', error));
        }
    }, [transactionsList, error]);
    return (_jsx(Box, __assign({ boxShadow: 2, className: classes.root }, { children: _jsxs(Grid, __assign({ container: true, spacing: 1 }, { children: [_jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsx(TransactionsForm, {}, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsx(TransactionsSearch, {}, void 0) }), void 0), _jsx(TransactionsList, {}, void 0)] }), void 0) }), void 0));
};
export default Transactions;

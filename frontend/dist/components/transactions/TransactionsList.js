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
import TransactionsHeader from './TransactionsHeader';
import TransactionsRow from './TransactionsRow';
import { useSelector } from 'react-redux';
var TransactionsList = function () {
    var transactionsList = useSelector(function (state) { return state.transactionReducer; });
    var renderRows = function () {
        return (transactionsList.map(function (element) {
            return (_jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsx(TransactionsRow, { data: element }, void 0) }), element._id));
        }));
    };
    return (_jsxs(Grid, __assign({ container: true, spacing: 1 }, { children: [_jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsx(TransactionsHeader, {}, void 0) }), void 0), renderRows()] }), void 0));
};
export default TransactionsList;

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
import { makeStyles, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
var useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0.5rem'
    }, searchBar: {
        width: '100%'
    }, searchIcon: {
        width: '50px',
        textAlign: 'center',
        alignSelf: 'center'
    }
});
var TransactionsSearch = function () {
    var classes = useStyles();
    var _a = useState(''), searchInput = _a[0], setSearchInput = _a[1];
    var handleInput = function (e) {
        setSearchInput(e.target.value);
        //TODO: Add sleep timeout (0.5 sec perhaps) after that start running the filtering method
    };
    return (_jsxs("div", __assign({ className: classes.root }, { children: [_jsx(TextField, { id: 'filled-basic', label: 'Search Transactions', name: 'transactionSearchField', onChange: handleInput, value: searchInput, className: classes.searchBar }, void 0), _jsx("div", __assign({ className: classes.searchIcon }, { children: _jsx(SearchIcon, {}, void 0) }), void 0)] }), void 0));
};
export default TransactionsSearch;

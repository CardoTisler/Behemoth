import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
const useStyles = makeStyles({
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
const TransactionsSearch = () => {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState('');
    const handleInput = (e) => {
        setSearchInput(e.target.value);
        //TODO: Add sleep timeout (0.5 sec perhaps) after that start running the filtering method
    };
    return (_jsxs("div", Object.assign({ className: classes.root }, { children: [_jsx(TextField, { id: 'filled-basic', label: 'Search Transactions', name: 'transactionSearchField', onChange: handleInput, value: searchInput, className: classes.searchBar }, void 0), _jsx("div", Object.assign({ className: classes.searchIcon }, { children: _jsx(SearchIcon, {}, void 0) }), void 0)] }), void 0));
};
export default TransactionsSearch;

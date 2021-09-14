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
import { Grid, TextField, makeStyles, Button } from '@material-ui/core';
import { useState } from 'react';
//TODO: Add integer validation for amount input
//TODO: Add visual tweaks to the form, make it stand out from the rest (dark blue background between grid elements?)
var useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    }, field: {
        width: '100%'
    }, gridItem: {
        padding: '0.5%'
    }, button: {
        width: '100%',
        height: '100%'
    }
});
var TransactionsForm = function () {
    var _a = useState({
        date: '',
        name: '',
        text: '',
        amount: '',
        category: ''
    }), state = _a[0], setState = _a[1];
    var classes = useStyles();
    // const handleAdd = (e) => {
    //     //e.preventDefault()
    //     //TODO: Add UUID system for Transaction IDs
    //     //generate random ID for now.
    //     const randInt = Math.floor(Math.random() * 1000)
    //     props.addTransaction({...state, id: randInt.toString()})
    //     setState({
    //         date: '',
    //         name: '',
    //         text: '',
    //         amount: '',
    //         category: ''
    //     })    
    // }
    var handleInput = function (e) {
        var value = e.target.value;
        setState(__assign(__assign({}, state), { name: value }));
    };
    return (_jsx(Grid, __assign({ container: true, spacing: 2 }, { children: _jsxs("form", __assign({ 
            //onSubmit={handleAdd} 
            className: classes.root }, { children: [_jsx(Grid, __assign({ item: true, xs: 2, className: classes.gridItem }, { children: _jsx(TextField, { label: 'Date', name: 'date', className: classes.field, value: state.date, onChange: handleInput }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 2, className: classes.gridItem }, { children: _jsx(TextField, { label: 'Name', name: 'name', className: classes.field, value: state.name, onChange: handleInput }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 5, className: classes.gridItem }, { children: _jsx(TextField, { label: 'Description', name: 'text', className: classes.field, value: state.text, onChange: handleInput }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 1, className: classes.gridItem }, { children: _jsx(TextField, { label: 'Amount', name: 'amount', className: classes.field, value: state.amount, onChange: handleInput }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 1, className: classes.gridItem }, { children: _jsx(TextField, { label: 'Category', name: 'category', className: classes.field, value: state.category, onChange: handleInput }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 1, className: classes.gridItem }, { children: _jsx(Button, __assign({ className: classes.button, type: 'submit', variant: 'contained', color: 'primary' }, { children: "Add" }), void 0) }), void 0)] }), void 0) }), void 0));
};
export default TransactionsForm;

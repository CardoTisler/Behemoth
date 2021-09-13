import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, TextField, makeStyles, Button } from '@material-ui/core';
import { useState } from 'react';
//TODO: Add integer validation for amount input
//TODO: Add visual tweaks to the form, make it stand out from the rest (dark blue background between grid elements?)
const useStyles = makeStyles({
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
const TransactionsForm = () => {
    const [state, setState] = useState({
        date: '',
        name: '',
        text: '',
        amount: '',
        category: ''
    });
    const classes = useStyles();
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
    const handleInput = (e) => {
        const { value } = e.target;
        setState(Object.assign(Object.assign({}, state), { name: value }));
    };
    return (_jsx(Grid, Object.assign({ container: true, spacing: 2 }, { children: _jsxs("form", Object.assign({ 
            //onSubmit={handleAdd} 
            className: classes.root }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 2, className: classes.gridItem }, { children: _jsx(TextField, { label: 'Date', name: 'date', className: classes.field, value: state.date, onChange: handleInput }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 2, className: classes.gridItem }, { children: _jsx(TextField, { label: 'Name', name: 'name', className: classes.field, value: state.name, onChange: handleInput }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 5, className: classes.gridItem }, { children: _jsx(TextField, { label: 'Description', name: 'text', className: classes.field, value: state.text, onChange: handleInput }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 1, className: classes.gridItem }, { children: _jsx(TextField, { label: 'Amount', name: 'amount', className: classes.field, value: state.amount, onChange: handleInput }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 1, className: classes.gridItem }, { children: _jsx(TextField, { label: 'Category', name: 'category', className: classes.field, value: state.category, onChange: handleInput }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 1, className: classes.gridItem }, { children: _jsx(Button, Object.assign({ className: classes.button, type: 'submit', variant: 'contained', color: 'primary' }, { children: "Add" }), void 0) }), void 0)] }), void 0) }), void 0));
};
export default TransactionsForm;

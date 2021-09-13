var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, TextField, Button, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../redux/actions/categoryActions';
import { showError } from '../../redux/actions/errorActions';
import { hideSuccess, showSuccess } from '../../redux/actions/successActions';
const useStyles = makeStyles({
    root: {
        padding: '1rem',
        width: '100%',
        height: '8rem',
    }, formLayout: {
        display: 'flex',
        flexDirection: 'row'
    }, errorText: {
        color: 'red',
        fontSize: '0.8rem'
    }, buttonLayout: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        justifyContent: 'space-between',
        width: '8rem'
    }, textFields: {
        display: 'flex',
        flexDirection: 'column'
    }, incomeButton: {
        backgroundColor: 'green'
    }, expensesButton: {
        backgroundColor: 'red'
    }
});
const addToDatabase = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
    catch (err) {
        return { status: 400, error: err.message };
    }
});
const CategoryForm = () => {
    const classes = useStyles();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isIncomeCategory, setIsIncomeCategory] = useState(true);
    const [state, setState] = useState({
        category: '',
        budget: '',
    });
    const dispatch = useDispatch();
    const handleCategoryChange = () => {
        setIsIncomeCategory(!isIncomeCategory);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        //build object with data from states
        const data = { category: state.category, budget: state.budget, isIncomeCategory };
        //TODO: add input validation method to handleSubmit, handleSubmit should not continue if validation
        //method returns false. The validation method should accept the budget value and make sure it is
        //parseable to integer
        addToDatabase('/categories/new', data).then((res) => {
            if (res.status === 200) {
                dispatch(addCategory(res.addedItem, isIncomeCategory));
                dispatch(showSuccess(`New category added.`));
                setTimeout(() => { dispatch(hideSuccess()); }, 4000);
            }
            else if (res.status === 400) {
                dispatch(showError(`Couldn't make API request.`, res.error));
            }
        }).catch(err => {
            dispatch(showError(`Couldn't make API request.`, err.message));
        });
        //clear state value after sending data
        setState({
            category: "",
            budget: ""
        });
    };
    const handleInput = (e) => {
        //dynamic state update based on input in textfield
        if (e.target !== null) {
            if (e.target.name === 'categoryNameField') {
                setState(Object.assign(Object.assign({}, state), { category: e.target.value }));
            }
            else {
                //this regex checks if value contains only numbers
                if (/^\d+$/.test(e.target.value) || e.target.value === "") {
                    setState(Object.assign(Object.assign({}, state), { budget: e.target.value }));
                    if (showErrorMessage) { //TODO: Replace with Material UI helpertext
                        setShowErrorMessage(false);
                    }
                }
                else {
                    if (e.target.value !== "") {
                        setShowErrorMessage(true);
                    }
                    setState(Object.assign(Object.assign({}, state), { budget: e.target.value }));
                }
            }
        }
    };
    return (_jsx(Box, Object.assign({ className: classes.root, boxShadow: 4 }, { children: _jsxs("form", Object.assign({ onSubmit: () => handleSubmit, className: classes.formLayout }, { children: [_jsxs("div", Object.assign({ className: classes.textFields }, { children: [_jsx(TextField, { label: 'Category Name', name: 'categoryNameField', value: state.category, onChange: (e) => { handleInput(e); } }, void 0), !isIncomeCategory &&
                            _jsx(TextField, { label: 'Monthly Budget (\u20AC)', name: 'budgetValueField', value: state.budget, onChange: handleInput }, void 0), showErrorMessage && _jsx("p", Object.assign({ className: classes.errorText }, { children: "Invalid input!" }), void 0)] }), void 0), _jsxs("div", Object.assign({ className: classes.buttonLayout }, { children: [_jsx(Button, Object.assign({ type: "submit", variant: "contained", color: "primary" }, { children: "Add" }), void 0), _jsx(Button, Object.assign({ className: isIncomeCategory ? classes.incomeButton : classes.expensesButton, variant: 'contained', color: 'primary', onClick: handleCategoryChange }, { children: isIncomeCategory ? 'Income' : 'Expense' }), void 0)] }), void 0)] }), void 0) }), void 0));
};
export default CategoryForm;

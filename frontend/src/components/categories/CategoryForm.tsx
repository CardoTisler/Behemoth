import {Box, Button, makeStyles, TextField} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addToDatabase} from "../../fetch/categories";
import {addCategory} from "../../redux/actions/categoryActions";
import {showError} from "../../redux/actions/errorActions";
import {hideSuccess, showSuccess} from "../../redux/actions/successActions";
import {categoryFormSchema} from "../../validation";

const useStyles = makeStyles({
    root: {
        padding: "1rem",
        width: "100%",
        height: "8rem",
    }, formLayout: {
        display: "flex",
        flexDirection: "row",
    }, errorText: {
        color: "red",
        fontSize: "0.8rem",
    }, buttonLayout: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        justifyContent: "space-between",
        width: "8rem",
    }, textFields: {
        display: "flex",
        flexDirection: "column",
    }, incomeButton: {
        backgroundColor: "green",
    }, expensesButton: {
        backgroundColor: "red",
    },
});

const CategoryForm: React.FC = () => {
    const classes = useStyles();
    const [showInputError, setShowInputError] = useState(false);
    const [isIncomeCategory, setIsIncomeCategory] = useState(true);
    const [state, setState] = useState({
        budget: 1,
        name: "",
        type: "",
    });
    const dispatch = useDispatch();

    const handleCategoryChange = () => {
        setIsIncomeCategory(!isIncomeCategory);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const {name, budget, type} = state;
        try {
            await categoryFormSchema.validate({name, budget});
        } catch (err: any) {
            console.error(err.message);
            setShowInputError(true);
            return;
        }
        if (showInputError) { setShowInputError(false); }
        addToDatabase({name, budget, type})
            .then((res) => {
                dispatch(addCategory(res.addedItem, isIncomeCategory));
                dispatch(showSuccess(`New category added.`));
                setTimeout(() => {
                    dispatch(hideSuccess());
                }, 4000);
            }).catch((err: Error) => {
            dispatch(showError(`Couldn't make API request.`, err.message));
        });

        // clear state value after sending data
        setState({
            budget: 1,
            name: "",
            type: "",
        });
    };
    const handleInput = (e: any) => {
        // dynamic state update based on input in textfield
        if (e.target !== null) {
            if (e.target.name === "categoryNameField") {
                setState({...state, name: e.target.value});
            } else {
                // this regex checks if value contains only numbers
                if (/^\d+$/.test(e.target.value) || e.target.value === "") {
                    setState({...state, budget: e.target.value});
                    if (showInputError) {
                        setShowInputError(false);
                    }
                } else {
                    if (e.target.value !== "") {
                        setShowInputError(true);
                    }
                    setState({...state, budget: e.target.value});
                }
            }
        }
    };
    useEffect(() => {
        const type = isIncomeCategory ? "INCOME" : "EXPENSE";
        setState({...state, type});
    }, [isIncomeCategory]);
    return (
        <Box className={classes.root} boxShadow={4}>
            <form onSubmit={handleSubmit} className={classes.formLayout}>
                <div className={classes.textFields}>
                    <TextField
                        error={showInputError}
                        label="Category Name"
                        name="categoryNameField"
                        value={state.name}
                        onChange={handleInput}/>

                    {!isIncomeCategory &&
                        <TextField
                            error={showInputError}
                            label="Monthly Budget (€)"
                            name="budgetValueField"
                            value={state.budget}
                            onChange={handleInput}/>}
                </div>
                <div className={classes.buttonLayout}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary">Add</Button>

                    <Button
                        className={isIncomeCategory ? classes.incomeButton : classes.expensesButton}
                        variant="contained"
                        color="primary"
                        onClick={handleCategoryChange}>
                        {isIncomeCategory ? "Income" : "Expense"}
                    </Button>
                </div>
            </form>
        </Box>
    );
};

export default CategoryForm;

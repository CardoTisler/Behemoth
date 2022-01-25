import {Button, Grid, makeStyles, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {hideError, showError} from "src/redux/actions/errorActions";
import {hideSuccess, showSuccess} from "src/redux/actions/successActions";
import {appendTransaction} from "src/redux/actions/transactionActions";
import {addTransactionToDatabase} from "../../fetch/transactions";
import {RootState} from "../../redux/reducers";
import {transactionFormSchema} from "../../validation";
import RowDropdown from "./RowDropdown";

const useStyles = makeStyles({
    dropdown: {
        marginTop: "1rem",
        padding: "0.5%",
    },
    gridItem: {
        padding: "0.5%",
    }, root: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
    }, field: {
        width: "100%",
    }, button: {
        height: "100%",
        width: "100%",
    },
});

const TransactionsForm: React.FC<any> = () => {
    const dispatch = useDispatch();
    const {noneCategory} = useSelector((rootstate: RootState) => rootstate.categoryReducer);
    const [state, setState] = useState({
        amount: "",
        date: "",
        description: "",
        name: "",
    });
    const {date, name, description, amount} = state;
    const [showInputError, setShowInputError] = useState(false);
    const [currentCategoryId, setCurrentCategoryId] = useState(noneCategory._id);
    const classes = useStyles();
    const handleInput = (e: { target: { name: string; value: string } }) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleChange = (e: any): void => {
        if (e.target !== null) {
            const newCategoryId = e.target.value;
            setCurrentCategoryId(newCategoryId);
        }
    };

    const onSubmit = async (e: any): Promise<void> => {
        e.preventDefault();
        let parsedAmount = -1;
        try {
            parsedAmount = parseFloat(amount);
            await transactionFormSchema.validate({
                amount: parsedAmount,
                category: currentCategoryId,
                date,
                description,
                name,
            });
        } catch (err: any) {
            setShowInputError(true);
            dispatch(showError(`Could not add new Transaction`, err.message));
            setTimeout(() => { dispatch(hideError()); }, 4000);
            return;
        }
        const convertedDate = new Date(date).toISOString();
        await addTransactionToDatabase({
            amount: parsedAmount,
            category: currentCategoryId,
            date: convertedDate,
            description,
            name,
        })
            .then((res: any) => {
                dispatch(showSuccess(res.statusText));
                dispatch(appendTransaction({...res.addedItem}));
                setTimeout(() => {
                    dispatch(hideSuccess());
                }, 4000);

                setState({name: "", description: "", amount: "", date: ""});
                setCurrentCategoryId(noneCategory._id);
            }).catch((err: Error) => {
                dispatch(showError(`Could not add new transaction to database`, err.message));
            });
    };

    return (
        <Grid container spacing={2}>
            <form
                encType="multipart/form-data" // required for Multer middleware to work.
                className={classes.root}
                onSubmit={onSubmit}>
                <Grid item xs={2} className={classes.gridItem}>
                    <TextField
                        error={showInputError}
                        label="Date ( DD/MM/YYYY )"
                        name="date"
                        className={classes.field}
                        value={state.date}
                        onChange={handleInput}/>
                </Grid>
                <Grid item xs={2} className={classes.gridItem}>
                    <TextField
                        error={showInputError}
                        label="Name"
                        name="name"
                        className={classes.field}
                        value={state.name}
                        onChange={handleInput}/>
                </Grid>
                <Grid item xs={5} className={classes.gridItem}>
                    <TextField
                        error={showInputError}
                        label="Description"
                        name="description"
                        className={classes.field}
                        value={state.description}
                        onChange={handleInput}/>
                </Grid>
                <Grid item xs={1} className={classes.gridItem}>
                    <TextField
                        error={showInputError}
                        label="Amount"
                        name="amount"
                        className={classes.field}
                        value={state.amount}
                        onChange={handleInput}/>
                </Grid>
                <Grid item xs={1} className={classes.dropdown}>
                    {console.log(currentCategoryId)}
                    <RowDropdown currentCategory={currentCategoryId} handleChange={handleChange}/>
                </Grid>
                <Grid item xs={1} className={classes.gridItem}>
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >Add</Button>
                </Grid>
            </form>
        </Grid>
    );
};

export default TransactionsForm;

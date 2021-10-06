import {Button, Grid, makeStyles, TextField} from "@material-ui/core";
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { showError } from "src/redux/actions/errorActions";
import { hideSuccess, showSuccess } from "src/redux/actions/successActions";
import { loadTransactions } from "src/redux/actions/transactionActions";
import { Transaction } from "../../../@types/TransactionTypes/Transaction";
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
// TODO: Add input validation hints to UI (display helpertext if validation rule broken)
const validateTransactionData = (data: Transaction): boolean => { // TODO: Add proper error handling.
    // date must be convertable to Date object
    // Amount must be convertable to float
    if (typeof data.name === "string") {
        return true;
    } else {
        return false;
    }
};
// FIXME: Figure out how the Promise<T> system works and implement proper types.
const addTransactionToDatabase = async (newTransaction: any): Promise<any> => {
    await fetch("/transactions/new", {
        body: JSON.stringify(newTransaction),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        mode: "cors",
    }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            throw new Error(res.statusText);
        }).catch((err: Error) => {
            throw new Error(err.message);
        });
};

const TransactionsForm: React.FC<any> = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        amount: "",
        date: "",
        description: "",
        name: "",
    });
    const {date, name, description, amount} = state;
    const [currentCategoryId, setCurrentCategoryId] = useState("0");

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
        const convertedDate = new Date(date).toISOString();
        const newTransaction: Transaction = {
            amount,
            category: currentCategoryId,
            date: convertedDate,
            description,
            name,
        };
        try {
            if (validateTransactionData(newTransaction)) {
                await addTransactionToDatabase(newTransaction)
                .then((res) => {
                        dispatch(showSuccess(res.statusText));
                        dispatch(loadTransactions([{...newTransaction}]));
                        setTimeout(() => {dispatch(hideSuccess()); }, 4000);

                        setState({name: "", description: "", amount: "", date: ""});
                        setCurrentCategoryId("0");
                }).catch((err: Error) => {
                        dispatch(showError(`Could not add new transaction to database`, err.message));
                });
            } else {
                throw new Error("Inserted data has wrong format!");
            }
        } catch (err: any) {
            dispatch(showError(`Cannot add new transaction.`, err.message));
        }
    };

    return (
        <Grid container spacing={2}>
            <form
            encType="multipart/form-data" // required for Multer middleware to work.
            className={classes.root}
            onSubmit={onSubmit}>
                <Grid item xs={2} className={classes.gridItem}>
                    <TextField
                    label="Date ( DD/MM/YYYY )"
                    name="date"
                    className={classes.field}
                    value={state.date}
                    onChange={handleInput} />
                </Grid>
                <Grid item xs={2} className={classes.gridItem}>
                    <TextField
                        label="Name"
                        name="name"
                        className={classes.field}
                        value={state.name}
                        onChange={handleInput} />
                </Grid>
                <Grid item xs={5} className={classes.gridItem}>
                    <TextField
                        label="Description"
                        name="description"
                        className={classes.field}
                        value={state.description}
                        onChange={handleInput} />
                </Grid>
                <Grid item xs={1} className={classes.gridItem}>
                    <TextField
                        label="Amount"
                        name="amount"
                        className={classes.field}
                        value={state.amount}
                        onChange={handleInput} />
                </Grid>
                <Grid item xs={1} className={classes.dropdown}>
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

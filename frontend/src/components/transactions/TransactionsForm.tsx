import {Button, Grid, makeStyles, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {showError} from "src/redux/actions/errorActions";
import {hideSuccess, showSuccess} from "src/redux/actions/successActions";
import {loadTransactions} from "src/redux/actions/transactionActions";
import {Transaction} from "../../../@types/TransactionTypes/Transaction";
import {addTransactionToDatabase} from "../../fetch/transactions";
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
    const [state, setState] = useState({
        amount: "",
        date: "",
        description: "",
        name: "",
    });
    const {date, name, description, amount} = state;
    const [currentCategoryId, setCurrentCategoryId] = useState("0");
    const [showErrorDate, setShowErrorDate] = useState(false);
    const [dateErrorMessage, setDateErrorMessage] = useState("");
    const [showErrorName, setShowErrorName] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [showErrorDesc, setShowErrorDesc] = useState(false);
    const [descErrorMessage, setDescErrorMessage] = useState("");
    const [showErrorAmount, setShowErrorAmount] = useState(false);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");

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

    const validateNameField = (nameInput: string): boolean => {
        if (nameInput.length > 40) {
            setNameErrorMessage("Name is too long, max 40 characters.");
            return false;
        }
        if (nameInput.length === 0) {
            setNameErrorMessage("Name field can not be empty");
            return false;
        }
        return true;
    };

    const validateDate = (dateInput: string): boolean => {
        try {
            new Date(dateInput).toISOString();
        } catch (err: any) {
            setDateErrorMessage("Can not convert date to Date object.");
            return false;
        }
        return true;
    };

    const validateDescription = (desc: string): boolean => {
        if (desc.length > 60) {
            setDescErrorMessage("Description too long!");
            return false;
        }
        return true;
    };

    const validateAmount = (amountInput: string): boolean => {
        let amountV;
        try {
            if (amountInput.split(".")[1].length > 2) {
                setAmountErrorMessage("Amount must have max 2 decimal places.");
                return false;
            }
            amountV = Number(amountInput);
        } catch (err: any) {
            setAmountErrorMessage("Input is not a number.");
            return false;
        }
        if (amountV < 0) {
            setAmountErrorMessage("Amount must be positive!");
            return false;
        }

        return true;
    };

    const validateTransactionData = (): boolean => {
        // date must be convertable to Date object
        // Amount must be convertable to float
        let validationPassed = true;
        if (!validateDate(date)) {
            setShowErrorDate(true);
            validationPassed = false;
        }
        if (!validateDescription(description)) {
            setShowErrorDesc(true);
            validationPassed = false;
        }
        if (!validateNameField(name)) {
            setShowErrorName(true);
            validationPassed = false;
        }
        if (!validateAmount(amount)) {
            setShowErrorAmount(true);
            validationPassed = false;
        }
        return validationPassed;
    };

    const onSubmit = async (e: any): Promise<void> => {
        e.preventDefault();
        if (!validateTransactionData()) {
            return;
        }
        const convertedDate = new Date(date).toISOString();
        const newTransaction: Transaction = {
            amount,
            category: currentCategoryId,
            date: convertedDate,
            description,
            name,
        };
        await addTransactionToDatabase(newTransaction)
            .then((res) => {
                dispatch(showSuccess(res.statusText));
                dispatch(loadTransactions([{...newTransaction}]));
                setTimeout(() => {
                    dispatch(hideSuccess());
                }, 4000);

                setState({name: "", description: "", amount: "", date: ""});
                setCurrentCategoryId("0");
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
                        error={showErrorDate}
                        helperText={showErrorDate && dateErrorMessage}
                        label="Date ( DD/MM/YYYY )"
                        name="date"
                        className={classes.field}
                        value={state.date}
                        onChange={handleInput}/>
                </Grid>
                <Grid item xs={2} className={classes.gridItem}>
                    <TextField
                        error={showErrorName}
                        helperText={showErrorName && nameErrorMessage}
                        label="Name"
                        name="name"
                        className={classes.field}
                        value={state.name}
                        onChange={handleInput}/>
                </Grid>
                <Grid item xs={5} className={classes.gridItem}>
                    <TextField
                        error={showErrorDesc}
                        helperText={showErrorDesc && descErrorMessage}
                        label="Description"
                        name="description"
                        className={classes.field}
                        value={state.description}
                        onChange={handleInput}/>
                </Grid>
                <Grid item xs={1} className={classes.gridItem}>
                    <TextField
                        error={showErrorAmount}
                        helperText={showErrorAmount && amountErrorMessage}
                        label="Amount"
                        name="amount"
                        className={classes.field}
                        value={state.amount}
                        onChange={handleInput}/>
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

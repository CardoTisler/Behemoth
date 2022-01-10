import { Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import {ChangeEvent} from "react";
import { useDispatch, useSelector } from "react-redux";
import {handleCsvExport, handleTransactionsDelete} from "../../fetch/transactions";
import { showError } from "../../redux/actions/errorActions";
import { hideSuccess, showSuccess } from "../../redux/actions/successActions";
import { loadTransactions } from "../../redux/actions/transactionActions";
import {unCheckAllTransactions} from "../../redux/actions/transactionCheckboxActions";
import { RootState } from "../../redux/reducers";

const useStyles = makeStyles({
    button: {
        height: "100%",
        width: "100%",
    },
});

/**
 * Receives file from client, sends it to server in binary format, server handles it by saving it and then
 * parses the file from .csv -> array of strings -> array of Transaction objects -> persist to MongoDB
 * @param e Event that holds data about the chosen file
 * @param dispatch Dispatch function for rendering success/failure tooltips and loading in new transactions
 * @returns statusCode - 200 if OK, 400 if any error encountered
 * @returns newItems - Array of Transaction objects if statusCode 200
 */
async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>, dispatch: any): Promise<void> {
    e.preventDefault();
    const data = new FormData();
    // Gets the file from HTML input from clientside
    // e.target.files[0] is a binary file
    // key MUST be 'csvUpload' because server side Multer searches for this key
    // from the request
    if (e.target.files![0] !== null) {
        data.append("csvUpload", e.target.files![0]);
    } else {
        dispatch(showError(`Can't upload file.`, `e.target.files[0] is null.`));
    }

    await fetch("/transactions/addcsv", {
        body: data,
        method: "POST",
        mode: "cors",
    })
        .then((res) => {
            if (res.status === 200) {
                return res.json(); }
            throw new Error(res.statusText);
        }).then((res) => {
            dispatch(showSuccess(res.statusText));
            setTimeout(() => {dispatch(hideSuccess()); }, 4000);
            dispatch(loadTransactions(res.newItems));
        }).catch((err: Error) => {
            dispatch(showError(`Uploading CSV file failed.`, err.message));
        });
}
const deleteTransaction = (checkedTransactions: string[], dispatch: any) => {
    handleTransactionsDelete(checkedTransactions).then((res) => {
        dispatch(loadTransactions(res.allTransactions));
        dispatch(unCheckAllTransactions());
        dispatch(showSuccess(res.statusText));
        setTimeout(() => dispatch(hideSuccess()), 4000);
    }).catch((err: Error) => {
        dispatch(showError("Could not delete the Transactions.", err.message));
    });
};

const TransactionButtons = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { transactions, checkedTransactions } = useSelector((state: RootState) => {
        const transactionsList = state.transactionReducer;
        const checkedTransactionsList = state.transactionCheckboxReducer;
        return {
            checkedTransactions: checkedTransactionsList,
            transactions: transactionsList,
        }; });

    return (
        <Grid container spacing={1}>
            <Grid item xs={1}>
                <input
                name="csvUpload"
                accept=".csv"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileSelected(e, dispatch)}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span" className={classes.button}>
                        Upload CSV
                    </Button>
                </label>
            </Grid>
            <Grid item xs={1}>
                <Button
                variant="contained"
                disabled={transactions.length === 0}
                component="span"
                className={classes.button}
                onClick={handleCsvExport}>
                    Export CSV
                </Button>
            </Grid>
            <Grid item xs={1}>
                <Button
                variant="contained"
                color="secondary"
                disabled={checkedTransactions.length === 0}
                component="span"
                className={classes.button}
                onClick={() => deleteTransaction(checkedTransactions, dispatch)}>
                    Delete Transactions
                </Button>
            </Grid>
        </Grid>
    );
};

export default TransactionButtons;

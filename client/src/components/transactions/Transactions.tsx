import { Box, Grid, makeStyles} from "@material-ui/core";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setBannerTitle} from "../../redux/actions/bannerActions";
import TransactionButtons from "./TransactionButtons";
import TransactionsForm from "./TransactionsForm";
import TransactionsList from "./TransactionsList";
import TransactionsSearch from "./TransactionsSearch";
import {RootState} from "../../redux/reducers";
import {useFetchCategories} from "../../hooks/useFetchCategories";
import {useFetchTransactions} from "../../hooks/useFetchTransactions";
import {loadCategories} from "../../redux/actions/categoryActions";
import {loadTransactions} from "../../redux/actions/transactionActions";

import {logger} from "../../logger"
logger.defaultMeta = {service:"Transactions.tsx"}
const useStyles = makeStyles({
    root: {
        padding: "0.7rem",
    },
});

const Transactions: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setBannerTitle({bannerTitle: "Transactions"}));
    }, []);
    return (
        <Box boxShadow={2} className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TransactionButtons />
                </Grid>
                <Grid item xs={12}>
                    <TransactionsForm />
                </Grid>
                <Grid item xs={12}>
                    <TransactionsSearch />
                </Grid>
                <TransactionsList/>

            </Grid>
        </Box>
    );
};

export default Transactions;

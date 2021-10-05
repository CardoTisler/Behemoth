import { Box, Grid, makeStyles} from "@material-ui/core";
import CsvButtons from "./CsvButtons";
import TransactionsForm from "./TransactionsForm";
import TransactionsList from "./TransactionsList";
import TransactionsSearch from "./TransactionsSearch";

const useStyles = makeStyles({
    root: {
        padding: "0.7rem",
    },
});

const Transactions: React.FC = () => {
    const classes = useStyles();
    return (
        <Box boxShadow={2} className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <CsvButtons />
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

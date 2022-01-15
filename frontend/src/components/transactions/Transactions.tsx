import { Box, Grid, makeStyles} from "@material-ui/core";
import TransactionButtons from "./TransactionButtons";
import TransactionsForm from "./TransactionsForm";
import TransactionsList from "./TransactionsList";
import TransactionsSearch from "./TransactionsSearch";
// FIXME: Think of a solution so that Transactions tab wont crash if NONE category nonexistent
// Either add global defautl NONE category or modify register route to automatically add NONE category
// for new users?
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

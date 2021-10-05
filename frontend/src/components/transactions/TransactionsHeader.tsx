import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        border: "solid",
        borderWidth: "1px",
        textAlign: "center",
    },
});

const TransactionsHeader = () => {
    const classes = useStyles();

    return (
        <div>
            <Grid container>
                <Grid item xs={2} className={classes.root}>
                    <p>Date</p>
                </Grid>
                <Grid item xs={2} className={classes.root}>
                    <p>Name</p>
                </Grid>
                <Grid item xs={6} className={classes.root}>
                    <p>Description</p>
                </Grid>
                <Grid item xs={1} className={classes.root}>
                    <p>Amount</p>
                </Grid>
                <Grid item xs={1} className={classes.root}>
                    <p>Category</p>
                </Grid>
            </Grid>
        </div>
    );
};

export default TransactionsHeader;

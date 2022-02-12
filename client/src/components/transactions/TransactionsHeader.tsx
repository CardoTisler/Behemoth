import {Checkbox, Grid, makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
    checkAllTransactions,
    unCheckAllTransactions,
} from "../../redux/actions/transactionCheckboxActions";
import {RootState} from "../../redux/reducers";

const useStyles = makeStyles({
    root: {
        border: "solid",
        borderWidth: "1px",
        textAlign: "center",
    },
});
interface Props {
    checkAll: (cb: (prev: boolean) => boolean) => void;
}

const TransactionsHeader: React.FC<Props> = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const transactions = useSelector((state: RootState) => state.transactionReducer);
    const handleChange = (e: {target: {checked: boolean}}) => {
        if (e.target.checked) {
            dispatch(checkAllTransactions({transactions}));
        } else {
            dispatch(unCheckAllTransactions());
        }
        props.checkAll((prev: boolean) => !prev);
    };
    return (
        <div>
            <Grid container>
                <Grid container item xs={2}>
                    <Grid item xs={2}>
                        <Checkbox onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={10} className={classes.root}>
                        <p>Date</p>
                    </Grid>
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

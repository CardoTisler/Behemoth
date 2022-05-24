import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { useDispatch, useSelector } from "react-redux";
import {Category} from "../../../@types/CategoryTypes/category";
import { Transaction } from "../../../@types/TransactionTypes/Transaction";
import { showError } from "../../redux/actions/errorActions";
import { RootState } from "../../redux/reducers";
import SummaryElement from "./SummaryElement";
import {getSummaryData} from "./summaryParse";

const useStyles = makeStyles({
    root: {
        alignContent: "center",
        marginRight: "5%",
        padding: 10,
        width: "40%",
    },
});

const SummaryPanels: React.FC = () => {
    const classes = useStyles();
    const transactions: Transaction[] = useSelector((state: RootState) => state.transactionReducer);
    const expenseCategories: Category[] = useSelector((state: RootState) => state.categoryReducer.expenseCategories);
    const dispatch = useDispatch();
    const {income, expenses, budget, savings, error} = getSummaryData(transactions, expenseCategories);

    if (error) { dispatch(showError(`Can not get data for Summary panels.`, error)); }

    return (
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12} md={6} >
                <SummaryElement
                text="Income"
                icon={<AttachMoneyIcon />}
                value={income}
                />
            </Grid>

            <Grid item xs={12} md={6} >
                <SummaryElement
                text="Expenses"
                icon={<TrendingDownIcon />}
                value={expenses}
                />
            </Grid>

            <Grid item xs={12} md={6} >
                <SummaryElement
                text="Budget"
                icon={<AccountBalanceWalletIcon />}
                value={budget}
                />
            </Grid>

            <Grid item xs={12} md={6} >
                <SummaryElement
                text="Savings"
                icon={<TrendingUpIcon />}
                value={savings}
                />
            </Grid>
        </Grid>
    );
};

export default SummaryPanels;

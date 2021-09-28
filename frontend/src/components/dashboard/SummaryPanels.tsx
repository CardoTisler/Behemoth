import SummaryElement from './SummaryElement'
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { RootState } from 'src/redux/reducers';
import { useSelector } from 'react-redux';
import { Transaction } from '../../../@types/TransactionTypes/Transaction';
import {getSummaryData} from './summaryParse'

const useStyles = makeStyles({
    root: {
        width: '25%',
        marginRight: '5%',
        padding: 10,
        border: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        alignContent: 'center'
    }
})

const SummaryPanels: React.FC = () => {
    const classes = useStyles();
    const transactions: Transaction[] = useSelector((state: RootState) => state.transactionReducer)
    const expenseCategories = useSelector((state: RootState) => state.categoryReducer.expenseCategories)
    
    const {income, expenses, budget, savings} = getSummaryData(transactions, expenseCategories)
    
    return (
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12} md={6} >
                <SummaryElement
                text='Income'
                icon={<AttachMoneyIcon />}
                value={income}
                />
            </Grid>

            <Grid item xs={12} md={6} >
                <SummaryElement 
                text='Expenses' 
                icon={<TrendingDownIcon />}
                value={expenses}
                />
            </Grid>

            <Grid item xs={12} md={6} >
                <SummaryElement 
                text='Budget' 
                icon={<AccountBalanceWalletIcon />} 
                value={budget} 
                />
            </Grid>

            <Grid item xs={12} md={6} >
                <SummaryElement 
                text='Savings' 
                icon={<TrendingUpIcon />} 
                value={savings}
                />
            </Grid>
        </Grid>
    )
}

export default SummaryPanels

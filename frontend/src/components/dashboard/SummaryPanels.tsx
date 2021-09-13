import SummaryElement from './SummaryElement'
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core'

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

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

    return (
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12} md={6} >
                <SummaryElement
                text='Income'
                icon={<AttachMoneyIcon />}
                value='700€' 
                />
            </Grid>

            <Grid item xs={12} md={6} >
                <SummaryElement 
                text='Expenses' 
                icon={<TrendingDownIcon />}
                value='500€' 
                />
            </Grid>

            <Grid item xs={12} md={6} >
                <SummaryElement 
                text='Budget' 
                icon={<AccountBalanceWalletIcon />} 
                value='500€/650€' 
                />
            </Grid>

            <Grid item xs={12} md={6} >
                <SummaryElement 
                text='Savings' 
                icon={<TrendingUpIcon />} 
                value='1122€' 
                />
            </Grid>
        </Grid>
    )
}

export default SummaryPanels

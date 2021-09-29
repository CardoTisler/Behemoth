import { makeStyles, Grid, Box} from '@material-ui/core'
import TransactionsSearch from './TransactionsSearch'
import TransactionsList from './TransactionsList'
import TransactionsForm from './TransactionsForm'
import CsvButtons from './CsvButtons'

const useStyles = makeStyles({
    root: {
        padding: '0.7rem'
    }
})

const Transactions: React.FC = () => {
    const classes = useStyles() 

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
    )
}


export default Transactions

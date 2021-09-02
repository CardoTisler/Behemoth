import React from 'react'
import { makeStyles, Grid, Box} from '@material-ui/core'
import TransactionsSearch from './TransactionsSearch'
import TransactionsList from './TransactionsList'
import TransactionsForm from './TransactionsForm'
//TODO: if rendering positive or 0 number to amount column, font green, otherwise red 

const useStyles = makeStyles({
    root: {
        padding: '0.7rem'
    }
})

const Transactions = (props) => {
    const classes = useStyles()
    //TODO: Can replace TransactionsList element with DataGrid(Material UI https://material-ui.com/components/data-grid/editing/)
    return (
        <Box boxShadow={2} className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}> 
                    <TransactionsForm addTransaction={props.addTransaction}/>
                </Grid>
                <Grid item xs={12}>
                    <TransactionsSearch />
                </Grid>
                <TransactionsList list={props.list}/>
            </Grid>
        </Box>
    )
}


export default Transactions

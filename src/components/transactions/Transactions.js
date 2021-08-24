import React from 'react'
import fakeData from './tempdata'
import { makeStyles, Grid, Box } from '@material-ui/core'
import TransactionsSearch from './TransactionsSearch'
import TransactionsList from './TransactionsList'

//TODO: if rendering positive or 0 number to amount column, font green, otherwise red 

const useStyles = makeStyles({
    root: {
        padding: '0.7rem'
    }
})

const Transactions = () => {
    const data = fakeData()
    const classes = useStyles()

    return (
        <Box boxShadow={2} className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TransactionsSearch />
                </Grid>
                <TransactionsList />
            </Grid>
        </Box>
    )
}


export default Transactions

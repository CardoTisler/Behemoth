import {useEffect} from 'react'
import { makeStyles, Grid, Box} from '@material-ui/core'
import TransactionsSearch from './TransactionsSearch'
import TransactionsList from './TransactionsList'
import TransactionsForm from './TransactionsForm'

import { useDispatch, useSelector } from 'react-redux'
import { loadTransactions } from '../../redux/actions/transactionActions'
import { useFetchTransactions } from '../../hooks/useFetchTransactions'
import transactionReducer from '../../redux/reducers/transactionReducer'
import { showError } from '../../redux/actions/errorActions'
//TODO: if rendering positive or 0 number to amount column, font green, otherwise red 

const useStyles = makeStyles({
    root: {
        padding: '0.7rem'
    }
})

const Transactions = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {transactionsList, error} = useFetchTransactions()
    
    useEffect( () => {
        if(!error){
            dispatch(loadTransactions(transactionsList))
        } else {
            dispatch(showError('Can not render transactions!', error))
        }
    }, [transactionsList, error])
    //const handleTransactionAdd = (transactionItem) => { setTransactionsList([...transactionsList, transactionItem])}
    
    return (
        <Box boxShadow={2} className={classes.root}>
            <Grid container spacing={1}>
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

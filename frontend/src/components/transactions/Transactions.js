import {useEffect} from 'react'
import { makeStyles, Grid, Box} from '@material-ui/core'
import TransactionsSearch from './TransactionsSearch'
import TransactionsList from './TransactionsList'
import TransactionsForm from './TransactionsForm'

import { useDispatch } from 'react-redux'
import { loadTransactions } from '../../redux/actions/transactionActions'

//TODO: if rendering positive or 0 number to amount column, font green, otherwise red 

const useStyles = makeStyles({
    root: {
        padding: '0.7rem'
    }
})

const getData = async () => {
    try {
        const response = await fetch('transactions/show');
        const data = await response.json()
        return data
    } catch (err) {
        console.log(err) }
}


const Transactions = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect( () => {
        async function fetch(){
            await getData().then(res => {
                if(res.status === 200){
                    dispatch(loadTransactions(res.transactionsList))
                
                } else if (res.status === 400){
                    console.log('Error getting lists from database')
                }
            }).catch(err => {
                console.error(err)
                console.log('Error making get/show request to database.')
            })
        }
        fetch()
    }, [])
    //const handleTransactionAdd = (transactionItem) => { setTransactionsList([...transactionsList, transactionItem])}
    
    return (
        <Box boxShadow={2} className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}> 
                    {/* <TransactionsForm addTransaction={handleTransactionAdd}/> */}
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

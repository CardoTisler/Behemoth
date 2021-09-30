import {Grid, TextField, makeStyles, Button} from '@material-ui/core'
import { Transaction } from '../../../@types/TransactionTypes/Transaction'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { showError } from 'src/redux/actions/errorActions'
import { hideSuccess, showSuccess } from 'src/redux/actions/successActions'
import { getTransactions, loadTransactions } from 'src/redux/actions/transactionActions'
import RowDropdown from './RowDropdown'

//TODO: Add integer validation for amount input
const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    }, field: {
        width: '100%'
    }, gridItem: {
        padding: '0.5%'
    }, button: {
        width: '100%',
        height: '100%'
    }
})
//TODO: Add input validation hints to UI.
const validateTransactionData = (data: Transaction): boolean => { //TODO: Add proper error handling.
    if(typeof data.name === 'string'){
        return true;
    } else {
        return false;
    }
}

const addTransactionToDatabase = async (newTransaction: any) => {
    const response = await fetch('/transactions/new', {
        method: 'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTransaction)
    })
    return response
}
const TransactionsForm: React.FC<any> = () => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        date: '',
        name: '',
        description: '',
        amount: ''
    })
    const {date, name, description, amount} = state;
    const [currentCategoryId, setCurrentCategoryId] = useState('0')

    const classes = useStyles()

    const handleInput = (e: { target: { name: string; value: string } }) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleChange = (e: any): void => {
        if(e.target !== null){
            const newCategoryId = e.target.value;
            setCurrentCategoryId(newCategoryId)
        }
    }

    const onSubmit = async (e: any): Promise<void> => {
        e.preventDefault()
        const newTransaction: Transaction = {date, name, description, amount, category: currentCategoryId}
        try{
            if(validateTransactionData(newTransaction)){
                await addTransactionToDatabase(newTransaction)
                .then((res: any) => res.json())
                .then(res => {
                    if(res.status === 200){
                        dispatch(showSuccess(res.statusText))
                        dispatch(loadTransactions([{...newTransaction}]))
                        setTimeout(() => {dispatch(hideSuccess())}, 4000);

                        setState({name: '', description: '', amount: '', date:''})
                        setCurrentCategoryId('0')
                        
                    } else if (res.status === 400){
                        dispatch(showError(res.statusText, res.message))
                    }
                })
            } else {
                throw new Error('Inserted data has wrong format!')
            }
        } catch (err: any){
            dispatch(showError(`Cannot add new transaction.`, err.message))
        }
    }

    return (
        <Grid container spacing={2}>
            <form 
            encType="multipart/form-data" //required for Multer middleware to work.
            className={classes.root}
            onSubmit={onSubmit}>
                <Grid item xs={2} className={classes.gridItem}>
                    <TextField
                    label='Date'
                    name='date'
                    className={classes.field}
                    value={state.date}
                    onChange={handleInput} />
                </Grid>
                <Grid item xs={2} className={classes.gridItem}>
                    <TextField
                        label='Name'
                        name='name'
                        className={classes.field}
                        value={state.name}
                        onChange={handleInput} />
                </Grid>
                <Grid item xs={5} className={classes.gridItem}>
                    <TextField
                        label='Description'
                        name='description'
                        className={classes.field}
                        value={state.description}
                        onChange={handleInput} />
                </Grid>
                <Grid item xs={1} className={classes.gridItem}>
                    <TextField
                        label='Amount'
                        name='amount'
                        className={classes.field}
                        value={state.amount}
                        onChange={handleInput} />
                </Grid>
                <Grid item xs={1} className={classes.gridItem}>
                    <RowDropdown currentCategory={currentCategoryId} handleChange={handleChange}/>
                </Grid>
                <Grid item xs={1} className={classes.gridItem}>
                    <Button
                    className={classes.button}
                    type='submit'
                    variant='contained'
                    color='primary'
                    >Add</Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default TransactionsForm

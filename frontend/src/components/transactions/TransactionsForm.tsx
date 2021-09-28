import {Grid, TextField, makeStyles, Button} from '@material-ui/core'
import { Transaction } from '../../../@types/TransactionTypes/Transaction'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { showError } from 'src/redux/actions/errorActions'
import { hideSuccess, showSuccess } from 'src/redux/actions/successActions'
import { getTransactions, loadTransactions } from 'src/redux/actions/transactionActions'
import RowDropdown from './RowDropdown'

//TODO: Add single category add functionality
//TODO: Add integer validation for amount input
//TODO: Add visual tweaks to the form, make it stand out from the rest (dark blue background between grid elements?)
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
        text: '',
        amount: ''
    })
    const {date, name, text, amount} = state;
    const [currentCategoryId, setCurrentCategoryId] = useState('0')

    const classes = useStyles()

    const handleInput = (e: { target: { name: string; value: string } }) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    
    const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        e.preventDefault()
        let data = new FormData()
        if(e.target.files![0] !== null){
            data.append('csvUpload', e.target.files![0]);
        } else {
            dispatch(showError(`Can't upload file.`, `e.target.files[0] is null.`))
        }
        
        await fetch('/transactions/addcsv', {
            method: 'POST',
            mode:'cors',
            body: data
        })
        .then(res => res.json())
        .then(res => {

            if(res.status === 200){
                dispatch(showSuccess(res.statusText))
                setTimeout(() => {dispatch(hideSuccess())}, 4000);
                dispatch(loadTransactions(res.newItems))
            } else if (res.status === 500){
                dispatch(showError(`Uploading CSV file failed.`, res.statusText))
            } else {
                dispatch(showError(`Unknown error.`, `Error occurred in TransactionsForm.`))
            }
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
        const newTransaction: Transaction = {date, name, text, amount, category: currentCategoryId}
        try{
            if(validateTransactionData(newTransaction)){
                await addTransactionToDatabase(newTransaction)
                .then((res: any) => res.json())
                .then(res => {
                    if(res.status === 200){
                        dispatch(showSuccess(res.statusText))
                        dispatch(loadTransactions([{...newTransaction}]))
                        setTimeout(() => {dispatch(hideSuccess())}, 4000);

                        setState({name: '', text: '', amount: '', date:''})
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
                <Grid item xs={4} className={classes.gridItem}>
                    <TextField
                        label='Description'
                        name='text'
                        className={classes.field}
                        value={state.text}
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
                    {/* <TextField
                        label='Category'
                        name='category'
                        className={classes.field}
                        value={state.category}
                        onChange={handleInput} /> */}
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
                <Grid item xs={1} className={classes.gridItem}>
                    <input
                        name="csvUpload"
                        accept=".csv"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={handleFileSelected}
                    />
                    <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span" className={classes.button}>
                        Upload CSV
                    </Button>
                    </label> 
                </Grid>
            </form>
        </Grid>
    )
}

export default TransactionsForm

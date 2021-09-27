import {Grid, TextField, makeStyles, Button} from '@material-ui/core'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { showError } from 'src/redux/actions/errorActions'
import { hideSuccess, showSuccess } from 'src/redux/actions/successActions'
import { getTransactions, loadTransactions } from 'src/redux/actions/transactionActions'

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

const TransactionsForm: React.FC<any> = () => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        date: '',
        name: '',
        text: '',
        amount: '',
        category: ''
    })
    const classes = useStyles()

    const handleInput = (e: { target: { name: string; value: string } }) => {
        const {value} = e.target
        setState({
            ...state,
            name: value
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
                dispatch(showError(`sth broke`, `no idea`))
            }
        })
    }
    return (
        <Grid container spacing={2}>
            <form 
            encType="multipart/form-data" //required for Multer middleware to work.
            className={classes.root}>
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
{/* TODO: Category should be dropdown menu with registered income&expense categories */}
                <Grid item xs={1} className={classes.gridItem}>
                    <TextField
                        label='Category'
                        name='category'
                        className={classes.field}
                        value={state.category}
                        onChange={handleInput} />
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

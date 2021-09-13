import {Grid, TextField, makeStyles, Button} from '@material-ui/core'
import {useState} from 'react'

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

interface Props {

}

const TransactionsForm = () => {
    const [state, setState] = useState({
        date: '',
        name: '',
        text: '',
        amount: '',
        category: ''
    })
    const classes = useStyles()

    // const handleAdd = (e) => {
    //     //e.preventDefault()
    //     //TODO: Add UUID system for Transaction IDs
    //     //generate random ID for now.
    //     const randInt = Math.floor(Math.random() * 1000)
    //     props.addTransaction({...state, id: randInt.toString()})
    //     setState({
    //         date: '',
    //         name: '',
    //         text: '',
    //         amount: '',
    //         category: ''
    //     })    
    // }
    const handleInput = (e: { target: { name: string; value: string } }) => {
        const {value} = e.target
        setState({
            ...state,
            name: value
        })
    }
    
    return (
        <Grid container spacing={2}>
            <form 
            //onSubmit={handleAdd} 
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
                <Grid item xs={5} className={classes.gridItem}>
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
            </form>
        </Grid>
    )
}

export default TransactionsForm

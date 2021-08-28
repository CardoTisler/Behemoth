import {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    }
})
//TODO: if rendering positive or 0 number to amount column, font green, otherwise red 
const TransactionsRow = (props) => {
    const classes = useStyles()

    return (
        <Grid container className={classes.root}>
            <Grid item xs={2}>
                <p>{props.data.date}</p>
            </Grid>
            <Grid item xs={2}>
                <p>{props.data.name}</p>
            </Grid>
            <Grid item xs={6}>
                <p>{props.data.text}</p>
            </Grid>
            <Grid item xs={1}>
                <p>{props.data.amount}</p>
            </Grid>
            <Grid item xs={1}>
                <p>{props.data.category}</p>
            </Grid>
        </Grid>
    )
}

export default TransactionsRow

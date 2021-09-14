import {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Transaction } from '../../@types/TransactionTypes/Transaction'
import RowDropdown from './RowDropdown'

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    }
})
//TODO: if rendering positive or 0 number to amount column, font green, otherwise red

interface Props{
    data: Transaction
}
const TransactionsRow: React.FC<Props> = (props) => {
    const {date, name, text, amount, category, _id} = props.data
    const classes = useStyles()
    
    return (
        <Grid container className={classes.root}>
            <Grid item xs={2}>
                <p>{date}</p>
            </Grid>
            <Grid item xs={2}>
                <p>{name}</p>
            </Grid>
            <Grid item xs={6}>
                <p>{text}</p>
            </Grid>
            <Grid item xs={1}>
                <p>{amount}</p>
            </Grid>
            <Grid item xs={1}>
                <RowDropdown 
                transactionCategoryId={category}
                transactionName={name}
                transactionId={_id}/>
            </Grid>
        </Grid>
    )
}

export default TransactionsRow

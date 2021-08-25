import {Grid} from '@material-ui/core'
import TransactionsHeader from './TransactionsHeader'
import TransactionsRow from './TransactionsRow'

//expects array with objects of data
const renderRows = (data) => {
    return(data.map(element => {
        return(
            <Grid item xs={12} key={element.id}>
                <TransactionsRow data={element} />
            </Grid> )
    }))
}


const TransactionsList = (props) => {  
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TransactionsHeader />
            </Grid>

            {renderRows(props.list)}
        </Grid>
    )
}

export default TransactionsList

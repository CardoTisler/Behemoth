import {Grid} from '@material-ui/core'
import TransactionsHeader from './TransactionsHeader'
import TransactionsRow from './TransactionsRow'
import fakeData from './tempdata'

//expects array with objects of data
const renderRows = (data) => {
    return(data.map(element => {
        console.log(element)
        return(
            <Grid item xs={12}>
                <TransactionsRow key={element.id} data={element} />
            </Grid> )
    }))
}


const TransactionsList = () => {
    const data = fakeData()

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TransactionsHeader />
            </Grid>

            {renderRows(data)}
        </Grid>
    )
}

export default TransactionsList

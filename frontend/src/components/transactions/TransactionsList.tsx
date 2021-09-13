import {Grid} from '@material-ui/core'
import TransactionsHeader from './TransactionsHeader'
import TransactionsRow from './TransactionsRow'
import { useSelector } from 'react-redux'
import { Transaction } from '../../../@types/TransactionTypes/Transaction'
import { RootState } from '../../redux/reducers'

const TransactionsList = () => {  
    const transactionsList = useSelector((state: RootState) => state.transactionReducer)
    const renderRows = () => {
        return(transactionsList.map((element: Transaction)  => {
            return(
                <Grid item xs={12} key={element._id}>
                    <TransactionsRow 
                    data={element}/>
                </Grid> )
        }))
    }
    
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TransactionsHeader />
            </Grid>

            {renderRows()}
        </Grid>
    )
}

export default TransactionsList

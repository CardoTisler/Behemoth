import {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { showError } from 'src/redux/actions/errorActions'
import { updateTransactionsCategory } from 'src/redux/actions/transactionActions'
import { Transaction } from '../../../@types/TransactionTypes/Transaction'
import RowDropdown from './RowDropdown'
import type { APIinfo } from '../../../@types/API/index'

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    }
})
//TODO: if rendering positive or 0 number to amount column, font green, otherwise red


const handleCategoryUpdate = async (newCategoryId: string, transactionId: string): Promise<APIinfo> => {
    const url = '/transactions/update/'.concat(transactionId)
    const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({newCategoryId})
    })
    return response.json()
  }

interface Props{
    data: Transaction
}
const TransactionsRow: React.FC<Props> = (props) => {
    const {date, name, text, amount, category, _id} = props.data
    const classes = useStyles()
    const [currentCategoryId, setCurrentCategoryId] = useState("0");
    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentCategoryId(category);  
    }, [currentCategoryId]);
    
    const handleChange = async (e: any) => {
        if(e.target !== null){
          const newCategoryId = e.target.value
          await handleCategoryUpdate(newCategoryId, _id!).then((res: any) => {
            if(res.status === 200){
              setCurrentCategoryId(newCategoryId);
              dispatch(updateTransactionsCategory(name, newCategoryId))
              
            } else if (res.status === 400){
              throw new Error(res.statusText)
            }
          }).catch((err: Error) => {
            dispatch(showError(`Couldn't update transaction category.`, err.message))
          })
        }
    }
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
                handleChange={handleChange}
                currentCategoryId={category} />
            </Grid>
        </Grid>
    )
}

export default TransactionsRow


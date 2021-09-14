import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { showError } from '../redux/actions/errorActions';
import { Transaction } from '../@types/TransactionTypes/Transaction';

interface Props{}
interface State{
    transactionsList: Transaction[],
    error: string | null
}


export const useFetchTransactions = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState<Transaction[]>([])
    let error = null;
    //TODO: getData is defined the same way in almost every place. Turn it into reusable method.
    
    const getData = async (): Promise<any> => 
        await fetch('transactions/show')
            .then(res => {
                return res.json();
            })
            .catch(err => {
                throw new Error(err.message);
            })

    //FIXME: Use appropriate async await system (like in ListRow.js)
    useEffect( () => {
        async function fetch(){
            await getData().then( res => {
                if(res.status === 200){
                    setData([...res.transactionsList])
                } else if (res.status === 400) {
                    dispatch(showError(`Couldn't get transactions from database.`, res.statusText))
                    error = res.statusText
                }
            }).catch(err => error = err.statusMessage)
        }
        fetch()
    }, [])

    return {transactionsList: data, error};
}

import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { showError } from '../redux/actions/errorActions';
import { Transaction } from '../../@types/TransactionTypes/Transaction';

interface fetchReturn {
    transactionsList: Transaction[],
    error: boolean
}

export const useFetchTransactions = (): fetchReturn => {
    const dispatch = useDispatch()
    const [data, setData] = useState<Transaction[]>([])
    let error = false;
    
    const getData = async (): Promise<any> => 
        await fetch('transactions/show')
            .then(res => {
                if(res.status === 200){
                    return res.json();
                } else if (res.status === 400){
                    throw new Error(res.statusText)
                }
            })
            .catch(err => {
                throw new Error(err.message);
            })

    useEffect( () => {
        async function fetch(){
            await getData().then( res => {
                    setData([...res.transactionsList])
                }).catch((err: Error) => {
                    error = true
                    dispatch(showError(`Couldn't get transactions from database.`, err.message))                    
                })
        }
        fetch()
    }, [])

    return {transactionsList: data, error};
}

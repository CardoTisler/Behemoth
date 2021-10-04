import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { Transaction } from '../../@types/TransactionTypes/Transaction';
import { showInfo } from 'src/redux/actions/infoActions';

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
                    setData(res.transactionsList.map((transaction: Transaction) => {
                        return {...transaction, date: new Date(transaction.date).toLocaleDateString()}
                    }))
                }).catch((err: Error) => {
                    error = true
                    dispatch(showInfo('Did not find any transactions in the database.'))                
                })
        }
        fetch()
    }, [])
    return {transactionsList: data, error};
}

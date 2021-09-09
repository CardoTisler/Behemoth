import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { showError } from '../redux/actions/errorActions';

export const useFetchTransactions = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        transactionsList: [],
        error: null
    })
    
    const getData = async () => {
        try {
            const response = await fetch('transactions/show');
            const data = await response.json()
            return data
        } catch (err) {
            dispatch(showError(`Couldn't make API request.`, err.message))
            return {status: 404}}
    }
    //FIXME: Use appropriate async await system (like in ListRow.js)
    useEffect( () => {
        async function fetch(){
            await getData().then( res => {
                if(res.status === 200){
                    setData({ transactionsList: [...res.transactionsList]})
                } else if (res.status === 400) {
                    dispatch(showError(`Couldn't get transactions from database.`, res.error))
                    setData({error: res.error})
                }
            })
        }
        fetch()
    }, [])

    return data;
}

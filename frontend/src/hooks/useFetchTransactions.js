import {useEffect, useState} from 'react'

const getData = async () => {
    try {
        const response = await fetch('transactions/show');
        const data = await response.json()
        return data
    } catch (err) {
        console.log(err) }
}

export const useFetchTransactions = () => {
    const [data, setData] = useState({
        transactionsList: [],
        error: null
    })

    useEffect( () => {
        async function fetch(){
            await getData().then( res => {
                if(res.status === 200){
                    setData({ transactionsList: [...res.transactionsList]})
                } else if (res.status === 400) {
                    console.error('Server returned 400')
                    setData({error: res.error})
                }
            })
        }
        fetch()
    }, [])

    return data;
}

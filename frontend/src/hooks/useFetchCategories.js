import { useEffect, useState } from "react";

const getData = async () => {
    try {
        const response = await fetch('categories/show');
        const data = await response.json()
        return data
    } catch (err) {
        console.log(err) }
  }

export const useFetchCategories = () => {
    const [data, setData] = useState({
        incomeCategories: [],
        expenseCategories: [],
        noneCategory: {},
        error: null
    }) 
    useEffect( () => {
        async function fetch(){
            await getData().then(res => {
                if(res.status === 200){
                    setData({
                        incomeCategories: [...res.incomeList],
                        expenseCategories: [...res.expensesList],
                        noneCategory: {...res.noneCategory} })
                } else if (res.status === 400){
                    console.log('Error getting categories lists from database')
                    return {error: 'Error'}
                }
            }).catch(err => {
                console.log(err)
                console.log('Error making get/show request to database.')
                return {error: err}
            })
        }
        fetch()
    }, [])
    
    return data;
}
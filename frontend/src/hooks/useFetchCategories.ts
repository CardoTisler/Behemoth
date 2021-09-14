import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { Category, categoryState } from "../@types/CategoryTypes/category";
import { showError } from "../redux/actions/errorActions";

const getData = async () => {
    try {
        const response = await fetch('categories/show');
        const data = await response.json()
        return data
    } catch (err) {
        console.log(err) }
  }

interface FetchCategories {
    allCategories: categoryState, 
    error: boolean
}

export const useFetchCategories = (): FetchCategories => {
    const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
    const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
    const [noneCategory, setNoneCategory] = useState<Category>({
        type: "",
        category: "",
        budget: 0,
        _id: ""
    })  
    let error = false;
    const dispatch = useDispatch()
    
    useEffect( () => {
        async function fetch(){
            await getData().then(res => {
                if(res.status === 200){
                    setIncomeCategories([...res.incomeList])
                    setExpenseCategories([...res.expensesList])
                    setNoneCategory(res.noneCategory)
                } else if (res.status === 400){
                    dispatch(showError(`Error getting categories from database`, res.statusText))
                    error = true;
                }
            }).catch(err => {
                dispatch(showError(`Error making get/show request to database.`, ``))
                error = true;
            })
        }
        fetch()
    }, [])
    
    return {allCategories:{incomeCategories, expenseCategories, noneCategory}, error};
}
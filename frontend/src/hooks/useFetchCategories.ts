import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { Category, categoryState } from "../../@types/CategoryTypes/category";
import { showError } from "../redux/actions/errorActions";
import { Response } from "express";

const getData = async () => 
    await fetch('categories/show').then((res) => {
        return res.json()
    }).catch((err: Response) => {
        throw new Error(err.statusMessage)
    })
    
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
                    setIncomeCategories([...res.incomeCategories])
                    setExpenseCategories([...res.expenseCategories])
                    setNoneCategory(res.noneCategory)
                } else if (res.status === 400){
                    dispatch(showError(`Error getting categories from database`, res.statusText))
                    error = true;
                }
            }).catch((err: Error) => {
                dispatch(showError(`Error making API request to database.`, err.message))
            })
        }
        fetch()
    }, [])
    return {allCategories:{incomeCategories, expenseCategories, noneCategory}, error};
}
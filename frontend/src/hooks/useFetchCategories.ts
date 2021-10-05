import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { Category } from "../../@types/CategoryTypes/category";
import { showError } from "../redux/actions/errorActions";

const getData = async () =>
    await fetch("categories/show")
        .then((res: any) => {
            if (res.status === 200) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .catch((err) => { throw new Error(err.message); } );

interface FetchCategories {
    incomeCategories: Category[];
    expenseCategories: Category[];
    noneCategory: Category;
    categoryError: boolean;
}

export const useFetchCategories = (): FetchCategories => {
    const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
    const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
    const [noneCategory, setNoneCategory] = useState<Category>({
        _id: "",
        budget: 0,
        name: "",
        type: "",
    });
    let error = false;
    const dispatch = useDispatch();

    useEffect( () => {
        async function fetch() {
            await getData().then((res) => {
                setIncomeCategories([...res.incomeCategories]);
                setExpenseCategories([...res.expenseCategories]);
                setNoneCategory(res.noneCategory);
            }).catch((err: Error) => {
                error = true;
                dispatch(showError(`Error making API request to database.`, err.message));
            });
        }
        fetch();
    }, []);
    return {incomeCategories, expenseCategories, noneCategory, categoryError: error};
};

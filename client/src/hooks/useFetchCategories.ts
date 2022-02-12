import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { Category } from "../../@types/CategoryTypes/category";
import { getData } from "../fetch/categories";
import { showError } from "../redux/actions/errorActions";
import {logger} from "../logger";

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
        name: "defaultNone",
        type: "",
    });
    let error = false;
    const dispatch = useDispatch();

    useEffect( () => {
        async function fetch() {
            await getData().then((res: any) => {
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

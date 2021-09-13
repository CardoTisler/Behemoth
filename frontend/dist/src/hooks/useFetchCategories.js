var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from "react";
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('categories/show');
        const data = yield response.json();
        return data;
    }
    catch (err) {
        console.log(err);
    }
});
export const useFetchCategories = () => {
    const [data, setData] = useState({
        incomeCategories: [],
        expenseCategories: [],
        noneCategory: {},
        error: null
    });
    useEffect(() => {
        function fetch() {
            return __awaiter(this, void 0, void 0, function* () {
                yield getData().then(res => {
                    if (res.status === 200) {
                        setData({
                            incomeCategories: [...res.incomeList],
                            expenseCategories: [...res.expensesList],
                            noneCategory: Object.assign({}, res.noneCategory)
                        });
                    }
                    else if (res.status === 400) {
                        console.log('Error getting categories lists from database');
                        return { error: 'Error' };
                    }
                }).catch(err => {
                    console.log(err);
                    console.log('Error making get/show request to database.');
                    return { error: err };
                });
            });
        }
        fetch();
    }, []);
    return data;
};

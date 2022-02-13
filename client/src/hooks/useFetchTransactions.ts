import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { Transaction } from "../../@types/TransactionTypes/Transaction";
import {hideInfo, showInfo} from "../redux/actions/infoActions";
import {handleResponse} from "../fetch/common";

const getData = async (): Promise<FetchReturn> =>
    await fetch("transactions/show", {
        headers: {
            "x-access-token": localStorage.getItem("token") as string,
        },
    }).then(handleResponse)
        .then(res => res)
        .catch((err: any) => {
            throw new Error(err.message)
        });

interface FetchReturn {
    transactionsList: Transaction[];
    error: boolean;
}

/**
 * Fetches all transactions currently stored in the database
 * @returns Object transactionsList - array of all transaction objects and error boolean
 */
export const useFetchTransactions = (): FetchReturn => {
    const dispatch = useDispatch();
    const [data, setData] = useState<Transaction[]>([]);
    let error = false;

    useEffect( () => {
        async function fetch() {
            await getData().then( (res) => {
                    if (res.transactionsList.length === 0) {
                        dispatch(showInfo("Did not find any transactions in the database."));
                        setTimeout(() => dispatch(hideInfo()), 4000);
                    }
                    setData([...res.transactionsList]);
                }).catch((err: Error) => {
                    error = true;
                });
        }
        fetch();
    }, []);
    return {transactionsList: data, error};
};

import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { showInfo } from "src/redux/actions/infoActions";
import { Transaction } from "../../@types/TransactionTypes/Transaction";

/**
 * Requests all transactions from database and then evaluates response based on response statusCode
 * If statuscode = 200 then it returns response, if statuscode is anything else (typically 400) then it throws an error
 */
const getData = async (): Promise<FetchReturn> =>
    await fetch("transactions/show")
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            throw new Error(res.statusText);
        }).catch((err) => { throw new Error(err.message); });

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

import {addDays} from "date-fns/esm";
import { useState } from "react";
import {DateRangePicker} from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch } from "react-redux";
import { changeDateRange } from "src/redux/actions/dateFilterActions";
import {Transaction, ITransactionState} from "../../../@types/TransactionTypes/Transaction";
import {useFetchTransactions} from "../../hooks/useFetchTransactions";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import {loadTransactions} from "../../redux/actions/transactionActions";

/**
 * Predicate function that checks if given transactiondate is in between startDate and endDate
 * @param transactionDate Date of transaction in milliseconds.
 * @param startDate Daterange beginning date in milliseconds.
 * @param endDate Daterange enddate in milliseconds.
 * @return boolean startDate <= transactionDate <= endDate
 */
function isInDateRange(transactionDate: string, startDate: number, endDate: number): boolean {
    const transactionDateMs = new Date(transactionDate).getTime();
    if (startDate <= transactionDateMs && transactionDateMs <= endDate) {
        return true;
    }
    return false;
}

/**
 * @param transactions Array of all transaction objects
 * @param startDate Date object that represents the start of specified daterange
 * @param endDate Date object that  represents the end of specified daterange
 * @return array Returns an array of transactions with transaction.date between specified daterange.
 */
function filterTransactions(transactions: ITransactionState, startDate: Date, endDate: Date) {
    const startDateMs = startDate.getTime();
    const endDateMs = endDate.getTime();
    return transactions
        .filter((transaction: Transaction) =>
            isInDateRange(transaction.date, startDateMs, endDateMs));
}

const DateFilter: React.FC = () => {
    const dispatch = useDispatch();
    const {transactionsList, error} = useFetchTransactions();

    const [state, setState] = useState([
        {
            endDate: addDays(new Date(), 7),
            key: "selection",
            startDate: new Date(),
        },
    ]);

    useUpdateEffect(() => {
        if (!error) {
            const {endDate, startDate} = state[0];
            dispatch(changeDateRange(state[0]));
            const transactions = filterTransactions(transactionsList, startDate, endDate);
            dispatch(loadTransactions(transactions));
        }
    }, [dispatch, state]);

    return (
        <DateRangePicker
        weekStartsOn={1}
        showSelectionPreview={true}
        ranges={state}
        onChange={(item: any) => setState([item.selection])} />
     );
};

export default DateFilter;

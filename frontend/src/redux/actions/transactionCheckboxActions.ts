import { Transaction } from "../../../@types/TransactionTypes/Transaction";

interface IPayload {
    transactionId?: string;
    transactions?: Transaction[];
}
export interface ICheckAction {
    type: string;
    payload: IPayload;
}

/**
 * Add Transaction ID to the state holding all checked Transactions
 * @param payload transactionId = transaction._id
 */
export const checkTransaction = (payload: IPayload): ICheckAction => {
    return {
        payload,
        type: "CHECK_TRANSACTION",
    };
};
/**
 * Insert all transactions, passed in via args, to Transaction Checkbox state
 * @param payload Array of Transaction _id's to be added to Transaction Checkbox state
 */
export const checkAllTransactions = (payload: IPayload): ICheckAction => {
    return {
        payload,
        type: "CHECK_ALL_TRANSACTIONS",
    };
};

/**
 * Remove Transaction ID from the state holding all checked Transactions
 * @param payload transactionId = transaction._id
 */
export const unCheckTransaction = (payload: IPayload): ICheckAction => {
    return {
        payload,
        type: "UN_CHECK_TRANSACTION",
    };
};
/**
 * Clear transactionCheckboxReducer state
 */
export const unCheckAllTransactions = (): {type: string} => {
    return {
        type: "UN_CHECK_ALL_TRANSACTIONS",
    };
};

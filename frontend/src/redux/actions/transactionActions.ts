import {ITransactionAction, ITransactionPayload, Transaction} from "../../../@types/TransactionTypes/Transaction";

const payload: ITransactionPayload = {
    allTransactions: [],
    newCategoryId: "",
    transactionName: "",
};

/**
 * Returns the current transactions state.
 */
export const getTransactions = (): ITransactionAction => {
    return {
        type: "GET_TRANSACTIONS",
        payload: {...payload},
    };
};

// transactionIdentifier - name field of transactions that we want to change
// newCategoryId - id of the new category that was applied to the corresponding transactions
/**
 * @param transactionName Name of transactions' we want to change. Matches against every record in database.
 * @param newCategoryId _id of the Category record that we want to apply to the chosen transactions.
 */
export const updateTransactionsCategory = (transactionName: string, newCategoryId: string): ITransactionAction => {
    return {
        type: "UPDATE_TRANSACTIONS_CAT",
        payload: {
            ...payload,
            transactionName,
            newCategoryId,
        },
    };
};
/**
 * Add new transactions to the state.
 * @param allTransactions Array of transaction objects that we want to add to the state.
 */
export const loadTransactions = (allTransactions: Transaction[]): ITransactionAction => {
    return {
        type: "LOAD_TRANSACTIONS",
        payload: {
            ...payload,
            allTransactions,
        },
    };
};

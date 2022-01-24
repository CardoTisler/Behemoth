import {ITransactionAction, ITransactionState, Transaction} from "../../../@types/TransactionTypes/Transaction";

const defaultState: ITransactionState = [];

const transactionReducer = (state: ITransactionState = defaultState, action: ITransactionAction): ITransactionState => {
    switch (action.type) {
        default:
            return [...state];

        case "LOAD_TRANSACTIONS":
            return [...action.payload.allTransactions!];

        case "GET_TRANSACTIONS":
            return [...state];

        case "UPDATE_TRANSACTIONS_CAT":
            const name = action.payload.transactionName;
            const newCategoryId = action.payload.newCategoryId!;
            return state.map((transaction: Transaction) => {
                if (transaction.name === name) {
                    return {
                        ...transaction,
                        category: newCategoryId,
                    };
                }
                return {...transaction};
            });
        case "APPEND_TRANSACTION":
            state.push(action.payload.addedItem!);
            return [...state];
    }
};

export default transactionReducer;

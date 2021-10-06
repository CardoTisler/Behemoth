import {Category} from "../CategoryTypes/category";

interface Transaction {
    _id?: string;
    date: string;
    name: string;
    description: string;
    amount: number | string;
    category: Category | string; // must be string when adding but Category when retrieving from db
}

interface ITransactionPayload {
    transactionName?: string;
    newCategoryId?: string;
    allTransactions: Transaction[];
}

interface ITransactionAction {
    type: string;
    payload: ITransactionPayload;
}

interface ITransactionState extends Array<Transaction> { }

export type {
    Transaction,
    ITransactionPayload,
    ITransactionAction,
    ITransactionState,
};

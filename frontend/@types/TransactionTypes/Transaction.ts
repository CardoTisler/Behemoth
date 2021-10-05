import {Category} from "../CategoryTypes/category";

interface Transaction {
    _id?: string;
    date: string;
    name: string;
    description: string;
    amount: number | string;
    category: Category | string; // must be string when adding but Category when retrieving from db
}

interface Payload {
    transactionName?: string;
    newCategoryId?: string;
    allTransactions: Transaction[];
}

interface Action {
    type: string;
    payload: Payload;
}

interface TransactionState extends Array<Transaction> { }

export type {
    Transaction,
    Payload,
    Action,
    TransactionState,
};

import {Category} from "../CategoryTypes/Category";

interface Transaction {
    _id?: string;
    date: string;
    name: string;
    description: string;
    amount: number | string;
    category: Category | string; // must be string when adding but Category when retrieving from db
    user?: string;
}

export type {
    Transaction
}

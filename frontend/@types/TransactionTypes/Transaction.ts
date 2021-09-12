import {Category} from '../CategoryTypes/category'

interface Transaction {
    _id: string,
    date: string,
    name: string,
    text: string,
    amount: number,
    category: Category
}

interface Payload {
    transactionName?: string | null,
    newCategoryId?: string | null,
    allTransactions: Transaction[]
}

interface Action {
    type: string,
    payload: Payload
}


export type {
    Transaction,
    Payload,
    Action
}
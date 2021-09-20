interface Transaction {
    _id?: string,
    date: string,
    name: string,
    text: string,
    amount: number | string,
    category: string
}

interface Payload {
    transactionName?: string,
    newCategoryId?: string,
    allTransactions: Transaction[]
}

interface Action {
    type: string,
    payload: Payload
}

interface TransactionState extends Array<Transaction> { }

export type {
    Transaction,
    Payload,
    Action,
    TransactionState
}
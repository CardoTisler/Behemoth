import {Transaction, Payload, Action} from '../../../@types/TransactionTypes/Transaction'

const payload: Payload = {
    transactionName: null,
    newCategoryId: null,
    allTransactions: []
}

export const getTransactions = (): Action => {
    return {
        type: 'GET_TRANSACTIONS',
        payload: {...payload}
    }
}

//transactionIdentifier - name field of transactions that we want to change
//newCategoryId - id of the new category that was applied to the corresponding transactions
export const updateTransactionsCategory = (transactionName: string, newCategoryId: string): Action => {
    return {
        type: 'UPDATE_TRANSACTIONS_CAT',
        payload: {
            ...payload,
            transactionName,
            newCategoryId
        }
    }
}

export const loadTransactions = (allTransactions: Transaction[]): Action => {
    return {
        type: 'LOAD_TRANSACTIONS',
        payload: {
            ...payload,
            allTransactions
        }
    }
}
export const getTransactions = () => {
    return {
        type: 'GET_TRANSACTIONS'
    }
}

//transactionIdentifier - name field of transactions that we want to change
//newCategoryId - id of the new category that was applied to the corresponding transactions
export const updateTransactionsCategory = (transactionIdentifier, newCategoryId) => {
    return {
        type: 'UPDATE_TRANSACTIONS_CAT',
        payload: {
            transactionIdentifier,
            newCategoryId
        }
    }
}

export const loadTransactions = (allTransactions) => {
    return {
        type: 'LOAD_TRANSACTIONS',
        payload: {
            allTransactions
        }
    }
}
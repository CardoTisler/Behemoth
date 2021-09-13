const payload = {
    transactionName: '',
    newCategoryId: '',
    allTransactions: []
};
export const getTransactions = () => {
    return {
        type: 'GET_TRANSACTIONS',
        payload: Object.assign({}, payload)
    };
};
//transactionIdentifier - name field of transactions that we want to change
//newCategoryId - id of the new category that was applied to the corresponding transactions
export const updateTransactionsCategory = (transactionName, newCategoryId) => {
    return {
        type: 'UPDATE_TRANSACTIONS_CAT',
        payload: Object.assign(Object.assign({}, payload), { transactionName,
            newCategoryId })
    };
};
export const loadTransactions = (allTransactions) => {
    return {
        type: 'LOAD_TRANSACTIONS',
        payload: Object.assign(Object.assign({}, payload), { allTransactions })
    };
};

export const getCategories = () => {
    return {
        type: 'GET_TRANSACTIONS'
    }
}

//expects argument like allCategories = { incomeCategories: [], expenseCategories: [], noneCategory: []}
export const loadCategories = (allCategories) => {
    return {
        type: 'LOAD_CATEGORIES',
        payload: {
            ...allCategories
        }
    }
}
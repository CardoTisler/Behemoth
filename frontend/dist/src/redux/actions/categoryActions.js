//TODO: Make sure categories and transactions actions always return same object
const defaultNone = {
    type: '',
    category: '',
    budget: 0,
    _id: ''
};
const defaultPayload = {
    category_id: '',
    newCategory: defaultNone,
    allCategories: {
        incomeCategories: [],
        expenseCategories: [],
        noneCategory: defaultNone
    }
};
export const getCategories = () => {
    return {
        type: 'GET_TRANSACTIONS',
        payload: Object.assign({}, defaultPayload)
    };
};
export const loadCategories = (allCategories) => {
    return {
        type: 'LOAD_CATEGORIES',
        payload: Object.assign(Object.assign({}, defaultPayload), { allCategories: Object.assign({}, allCategories) })
    };
};
export const deleteCategory = (category_id) => {
    return {
        type: 'DELETE_CATEGORY',
        payload: Object.assign(Object.assign({}, defaultPayload), { category_id })
    };
};
export const addCategory = (newCategory, isIncomeCategory) => {
    const type = isIncomeCategory ? 'ADD_INCOME_CATEGORY' : 'ADD_EXPENSE_CATEGORY';
    return {
        type,
        payload: Object.assign(Object.assign({}, defaultPayload), { newCategory })
    };
};

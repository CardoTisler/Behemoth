const defaultCategory = {
    type: '',
    category: '',
    budget: 0,
    _id: ''
};
const initialState = {
    incomeCategories: [],
    expenseCategories: [],
    noneCategory: defaultCategory
};
export const categoryReducer = (state = Object.assign({}, initialState), action) => {
    switch (action.type) {
        default:
            return Object.assign({}, state);
        case 'LOAD_CATEGORIES':
            return Object.assign(Object.assign({}, initialState), action.payload);
        case 'GET_CATEGORIES':
            return Object.assign({}, state);
        case 'DELETE_CATEGORY':
            return Object.assign(Object.assign({}, state), { incomeCategories: state.incomeCategories.filter((category) => category._id !== action.payload.category_id), expenseCategories: state.expenseCategories.filter((category) => category._id !== action.payload.category_id) });
        case 'ADD_INCOME_CATEGORY':
            return Object.assign(Object.assign({}, state), { incomeCategories: [...state.incomeCategories, action.payload.newCategory] });
        case 'ADD_EXPENSE_CATEGORY':
            return Object.assign(Object.assign({}, state), { expenseCategories: [...state.expenseCategories, action.payload.newCategory] });
    }
};
export default categoryReducer;

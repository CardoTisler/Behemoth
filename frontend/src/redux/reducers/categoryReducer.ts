import type { categoryState, Action, Category } from "../../../@types/CategoryTypes/category";

const defaultCategory: Category = {
    type: '',
    category: '',
    budget: 0,
    _id: ''
}
const initialState: categoryState = {
    incomeCategories: [],
    expenseCategories: [],
    noneCategory: defaultCategory
}


export const categoryReducer = (state: categoryState = {...initialState}, action: Action): categoryState => {
    switch(action.type){
        default:
            return {...state};

        case 'LOAD_CATEGORIES':
            return {...initialState,
                ...action.payload}

        case 'GET_CATEGORIES':
            return {...state};
        
        case 'DELETE_CATEGORY':
            return {...state, 
                incomeCategories: state.incomeCategories.filter( 
                    (category: Category) => category._id !== action.payload.category_id),
                expenseCategories: state.expenseCategories.filter(
                    (category: Category) => category._id !== action.payload.category_id
                )}
        case 'ADD_INCOME_CATEGORY':
            return {
                ...state,
                incomeCategories: [...state.incomeCategories, action.payload.newCategory]
            }
        case 'ADD_EXPENSE_CATEGORY':
            return {
                ...state,
                expenseCategories: [...state.expenseCategories, action.payload.newCategory]
            }
    }
}

export default categoryReducer
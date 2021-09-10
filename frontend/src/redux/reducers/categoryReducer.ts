import { State, Action } from "../../Types/CategoryTypes/category";

const initialState: State = {
    incomeCategories: [],
    expenseCategories: [],
    noneCategory: null
}


export const categoryReducer = (state = {...initialState}, action: Action) => {
    switch(action.type){
        default:
            return {...state};

        case 'LOAD_CATEGORIES':
            return {...action.payload}

        case 'GET_CATEGORIES':
            return {...state};
        
        case 'DELETE_CATEGORY':
            return {...state, 
                incomeCategories: state.incomeCategories.filter( 
                    (category: any) => category._id !== action.payload.category_id),
                expenseCategories: state.expenseCategories.filter(
                    (category: any) => category._id !== action.payload.category_id
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

export default categoryReducer;
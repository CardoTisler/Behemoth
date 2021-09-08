
const initialState = {
    incomeCategories: [],
    expenseCategories: [],
    noneCategory: []
}
export const categoryReducer = (state = {...initialState}, action) => {
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
                    (category) => category._id !== action.payload.category_id),
                expenseCategories: state.expenseCategories.filter(
                    (category) => category._id !== action.payload.category_id
                )}        
    }
}

export default categoryReducer;
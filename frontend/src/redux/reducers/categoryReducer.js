
const initialState = {
    incomeCategories: [],
    expenseCategories: [],
    noneCategory: []
}
const categoryReducer = (state = {...initialState}, action) => {
    switch(action.type){
        default:
            console.log(state)
            return state;

        case 'LOAD_CATEGORIES':
            state = {...action.payload}
            return state;

        case 'GET_CATEGORIES':
            return state;
        
    }
}

export default categoryReducer;
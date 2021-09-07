
const transactionReducer = (state = [], action) => {
    console.log('transactionReducer')
    console.log(action.type)
    switch(action.type){
        default:
            return state;

        //expects array containing transaction objects
        case 'LOAD_TRANSACTIONS':
            console.log('loading transactions')
            state = [...action.payload.allTransactions]
            return state;

        case 'GET_TRANSACTIONS':
            return state;

        case 'UPDATE_TRANSACTIONS_CAT':
            const transIdentifier = action.payload.transactionIdentifier
            const newCategoryId = action.payload.newCategoryId

            //make updateMany request to database
    }
}

export default transactionReducer;
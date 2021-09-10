import {Transaction, Action} from '../../Types/TransactionTypes/Transaction'


const transactionReducer = (state: Transaction[] = [], action: Action) => {
    switch(action.type){
        default:
            return state;

        case 'LOAD_TRANSACTIONS':
            state = [...action.payload.allTransactions]
            return state;

        case 'GET_TRANSACTIONS':
            return [...state];

        case 'UPDATE_TRANSACTIONS_CAT':
            console.log('update')
            const name = action.payload.transactionName
            const newCategoryId = action.payload.newCategoryId
            
            return state.map((transaction) => {
                if(transaction.name === name){
                    return { ...transaction,
                        category: newCategoryId
                    }
                }
                return {...transaction}
            })
            
    }
}

export default transactionReducer;
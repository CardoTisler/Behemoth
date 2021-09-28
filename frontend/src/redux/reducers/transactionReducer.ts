import {Transaction, Action, TransactionState} from '../../../@types/TransactionTypes/Transaction'

const defaultState: TransactionState = []

const transactionReducer = (state: TransactionState = defaultState, action: Action): TransactionState => {
    switch(action.type){
        default:
            return [...state]

        case 'LOAD_TRANSACTIONS':
            return [...action.payload.allTransactions];

        case 'GET_TRANSACTIONS':
            return [...state];

        case 'UPDATE_TRANSACTIONS_CAT':
            const name = action.payload.transactionName
            const newCategoryId = action.payload.newCategoryId! //the exclamation mark tells TypeScript it can trust that this will not be undefined.
                                                                //for some reason it thinks it can be undefined even tho action UDPATE does not let anything but string value in.
            const updatedTransactions = state.map((transaction: Transaction) => {
                if(transaction.name === name){
                    return { ...transaction,
                        category: newCategoryId
                    }
                }
                return {...transaction}
            })
            
            return updatedTransactions
            
    }
}

export default transactionReducer;
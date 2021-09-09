import { combineReducers } from 'redux'
import categoryReducer from './categoryReducer'
import transactionReducer from './transactionReducer'
import errorReducer from './errorReducer'
import successReducer from './successReducer'
const allReducers = combineReducers({transactionReducer,
    categoryReducer, 
    errorReducer,
    successReducer})

export default allReducers;
import { combineReducers } from 'redux'
import categoryReducer from './categoryReducer'
import transactionReducer from './transactionReducer'

const allReducers = combineReducers({transactionReducer, categoryReducer})

export default allReducers;
import { combineReducers } from 'redux'
import categoryReducer from './categoryReducer'
import transactionReducer from './transactionReducer'
import errorReducer from './errorReducer'
import successReducer from './successReducer'
import loadingReducer from './loadingReducer'
import infoReducer from './infoReducer'
const allReducers = combineReducers({
    transactionReducer,
    categoryReducer, 
    errorReducer,
    successReducer,
    loadingReducer,
    infoReducer
})

export default allReducers;

export type RootState = ReturnType<typeof allReducers>

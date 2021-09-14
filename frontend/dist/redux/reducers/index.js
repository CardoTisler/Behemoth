import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import transactionReducer from './transactionReducer';
import errorReducer from './errorReducer';
import successReducer from './successReducer';
var allReducers = combineReducers({
    transactionReducer: transactionReducer,
    categoryReducer: categoryReducer,
    errorReducer: errorReducer,
    successReducer: successReducer
});
export default allReducers;

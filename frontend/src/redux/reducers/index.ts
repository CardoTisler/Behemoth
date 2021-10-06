import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import dateFilterReducer from "./dateFilterReducer";
import errorReducer from "./errorReducer";
import infoReducer from "./infoReducer";
import loadingReducer from "./loadingReducer";
import successReducer from "./successReducer";
import transactionCheckboxReducer from "./transactionCheckboxReducer";
import transactionReducer from "./transactionReducer";

const allReducers = combineReducers({
    categoryReducer,
    dateFilterReducer,
    errorReducer,
    infoReducer,
    loadingReducer,
    successReducer,
    transactionCheckboxReducer,
    transactionReducer,
});

export default allReducers;

export type RootState = ReturnType<typeof allReducers>;

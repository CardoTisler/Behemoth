import { ICheckAction } from "../actions/transactionCheckboxActions";
interface ITransactionCheckState extends Array<string> {}

const transactionCheckboxReducer = (state: ITransactionCheckState = [],
                                    action: ICheckAction): ITransactionCheckState => {
    switch (action.type) {
        default:
            return [...state];

        case "CHECK_TRANSACTION":
            return [...state, action.payload.transactionId];
        case "UN_CHECK_TRANSACTION":
            return state
                .filter((storedTransactionId) =>
                    storedTransactionId !== action.payload.transactionId);
    }
};

export default transactionCheckboxReducer;

const defaultState = [];
const transactionReducer = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return [...state, ...defaultState]; //this is probably redundant
        case 'LOAD_TRANSACTIONS':
            return [...action.payload.allTransactions, ...state];
        case 'GET_TRANSACTIONS':
            return [...state];
        case 'UPDATE_TRANSACTIONS_CAT':
            const name = action.payload.transactionName;
            const newCategoryId = action.payload.newCategoryId; //the exclamation mark tells TypeScript it can trust that this will not be undefined.
            //for some reason it thinks it can be undefined even tho action UDPATE does not let anything but string value in.
            const updatedTransactions = state.map((transaction) => {
                if (transaction.name === name) {
                    return Object.assign(Object.assign({}, transaction), { category: newCategoryId });
                }
                return Object.assign({}, transaction);
            });
            return updatedTransactions;
    }
};
export default transactionReducer;

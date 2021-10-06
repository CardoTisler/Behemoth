interface IPayload {
    transactionId: string;
}
export interface ICheckAction {
    type: string;
    payload: IPayload;
}

/**
 * Add Transaction ID to the state holding all checked Transactions
 * @param payload transactionId = transaction._id
 */
export const checkTransaction = (payload: IPayload): ICheckAction => {
    return {
        payload,
        type: "CHECK_TRANSACTION",
    };
};
/**
 * Remove Transaction ID from the state holding all checked Transactions
 * @param payload transactionId = transaction._id
 */
export const unCheckTransaction = (payload: IPayload): ICheckAction => {
    return {
        payload,
        type: "UN_CHECK_TRANSACTION",
    };
};

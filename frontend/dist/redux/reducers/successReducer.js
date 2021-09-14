var successReducer = function (state, action) {
    if (state === void 0) { state = { showSuccess: false, message: null }; }
    switch (action.type) {
        default:
            return state;
        case 'SHOW_SUCCESS':
            return {
                showSuccess: true,
                message: action.payload.message
            };
        case 'HIDE_SUCCESS':
            return {
                showSuccess: false,
                message: null
            };
    }
};
export default successReducer;

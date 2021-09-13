const defaultPayload = {
    title: null,
    message: null
};
export const showError = (title, message) => {
    return {
        type: 'SHOW_ERROR',
        payload: {
            title,
            message
        }
    };
};
export const hideError = () => {
    return {
        type: 'HIDE_ERROR',
        payload: defaultPayload
    };
};

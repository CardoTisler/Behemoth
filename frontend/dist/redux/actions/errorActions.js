var defaultPayload = {
    title: null,
    message: null
};
export var showError = function (title, message) {
    return {
        type: 'SHOW_ERROR',
        payload: {
            title: title,
            message: message
        }
    };
};
export var hideError = function () {
    return {
        type: 'HIDE_ERROR',
        payload: defaultPayload
    };
};

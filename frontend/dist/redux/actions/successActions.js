export var showSuccess = function (message) {
    return {
        type: 'SHOW_SUCCESS',
        payload: {
            message: message
        }
    };
};
export var hideSuccess = function () {
    return {
        type: 'HIDE_SUCCESS',
        payload: {
            message: ""
        }
    };
};

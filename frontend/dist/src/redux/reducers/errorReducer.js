"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorReducer = function (state, action) {
    if (state === void 0) { state = { showError: false, message: null, title: null }; }
    switch (action.type) {
        default:
            return state;
        case 'SHOW_ERROR':
            var message = action.payload.message;
            var title = action.payload.title;
            return {
                showError: true,
                title: title,
                message: message
            };
        case 'HIDE_ERROR':
            return {
                showError: false,
                message: null,
                title: null
            };
    }
};
exports.default = errorReducer;

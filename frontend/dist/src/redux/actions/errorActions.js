"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideError = exports.showError = void 0;
var defaultPayload = {
    title: null,
    message: null
};
var showError = function (title, message) {
    return {
        type: 'SHOW_ERROR',
        payload: {
            title: title,
            message: message
        }
    };
};
exports.showError = showError;
var hideError = function () {
    return {
        type: 'HIDE_ERROR',
        payload: defaultPayload
    };
};
exports.hideError = hideError;

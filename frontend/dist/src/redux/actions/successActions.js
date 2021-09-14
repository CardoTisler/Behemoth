"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideSuccess = exports.showSuccess = void 0;
var showSuccess = function (message) {
    return {
        type: 'SHOW_SUCCESS',
        payload: {
            message: message
        }
    };
};
exports.showSuccess = showSuccess;
var hideSuccess = function () {
    return {
        type: 'HIDE_SUCCESS',
        payload: {
            message: ""
        }
    };
};
exports.hideSuccess = hideSuccess;

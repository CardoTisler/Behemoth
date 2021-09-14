var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import { IconButton } from '@material-ui/core';
import { hideError } from '../../redux/actions/errorActions';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
var ErrorToolbar = function () {
    var dispatch = useDispatch();
    var _a = useSelector(function (state) { return state.errorReducer; }), showError = _a.showError, message = _a.message, title = _a.title;
    return (_jsx(_Fragment, { children: showError &&
            _jsxs(Alert, __assign({ severity: 'error', action: _jsx(IconButton, __assign({ "aria-label": 'close', color: 'inherit', size: 'small', onClick: function () {
                        dispatch(hideError());
                    } }, { children: _jsx(HighlightOffIcon, {}, void 0) }), void 0) }, { children: [_jsx(AlertTitle, { children: title }, void 0), message] }), void 0) }, void 0));
};
export default ErrorToolbar;

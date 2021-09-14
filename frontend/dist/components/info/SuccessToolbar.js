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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { IconButton } from '@material-ui/core';
import { hideSuccess } from '../../redux/actions/successActions';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
var SuccessToolbar = function () {
    var dispatch = useDispatch();
    var _a = useSelector(function (state) { return state.successReducer; }), showSuccess = _a.showSuccess, message = _a.message;
    return (_jsx(_Fragment, { children: showSuccess &&
            _jsx(Alert, __assign({ icon: _jsx(CheckIcon, { fontSize: 'inherit' }, void 0), severity: 'success', action: _jsx(IconButton, __assign({ "aria-label": 'close', color: 'inherit', size: 'small', onClick: function () {
                        dispatch(hideSuccess());
                    } }, { children: _jsx(HighlightOffIcon, {}, void 0) }), void 0) }, { children: message }), void 0) }, void 0));
};
export default SuccessToolbar;

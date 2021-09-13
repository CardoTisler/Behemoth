import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import { IconButton } from '@material-ui/core';
import { hideError } from '../../redux/actions/errorActions';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
const ErrorToolbar = () => {
    const dispatch = useDispatch();
    const { showError, message, title } = useSelector((state) => state.errorReducer);
    return (_jsx(_Fragment, { children: showError &&
            _jsxs(Alert, Object.assign({ severity: 'error', action: _jsx(IconButton, Object.assign({ "aria-label": 'close', color: 'inherit', size: 'small', onClick: () => {
                        dispatch(hideError());
                    } }, { children: _jsx(HighlightOffIcon, {}, void 0) }), void 0) }, { children: [_jsx(AlertTitle, { children: title }, void 0), message] }), void 0) }, void 0));
};
export default ErrorToolbar;

import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { IconButton } from '@material-ui/core';
import { hideSuccess } from '../../redux/actions/successActions';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
const SuccessToolbar = () => {
    const dispatch = useDispatch();
    const { showSuccess, message } = useSelector((state) => state.successReducer);
    return (_jsx(_Fragment, { children: showSuccess &&
            _jsx(Alert, Object.assign({ icon: _jsx(CheckIcon, { fontSize: 'inherit' }, void 0), severity: 'success', action: _jsx(IconButton, Object.assign({ "aria-label": 'close', color: 'inherit', size: 'small', onClick: () => {
                        dispatch(hideSuccess());
                    } }, { children: _jsx(HighlightOffIcon, {}, void 0) }), void 0) }, { children: message }), void 0) }, void 0));
};
export default SuccessToolbar;

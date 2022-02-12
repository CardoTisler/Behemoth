import { IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {Alert, AlertTitle} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import { hideError } from "../../redux/actions/errorActions";
import {RootState} from "../../redux/reducers";

const ErrorToolbar = () => {
    const dispatch = useDispatch();
    const {showError, message, title} = useSelector((state: RootState) => state.errorReducer);

    return (
        <>
        {showError &&
            <Alert
            severity="error"
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    dispatch(hideError());
                }}>
                    <HighlightOffIcon />
                </IconButton>
            }>
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        }
        </>
    );
};

export default ErrorToolbar;

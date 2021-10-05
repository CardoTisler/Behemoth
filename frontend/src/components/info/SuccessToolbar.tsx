import { IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {Alert} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import { hideSuccess } from "../../redux/actions/successActions";
import {RootState} from "../../redux/reducers";

const SuccessToolbar: React.FC = () => {
    const dispatch = useDispatch();
    const {showSuccess, message} = useSelector((state: RootState) => state.successReducer);

    return (
        <>
        {showSuccess &&
            <Alert
            icon={<CheckIcon fontSize="inherit"/>}
            severity="success"
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    dispatch(hideSuccess());
                }}>
                    <HighlightOffIcon />
                </IconButton>
            }>
                {message}
            </Alert>
        }
        </>
    );
};

export default SuccessToolbar;

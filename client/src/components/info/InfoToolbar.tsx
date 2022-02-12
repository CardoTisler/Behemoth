import { IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import InfoIcon from "@material-ui/icons/Info";
import {Alert} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import { hideInfo } from "src/redux/actions/infoActions";
import {RootState} from "../../redux/reducers";

const InfoToolbar: React.FC = () => {
    const dispatch = useDispatch();
    const {showInfo, message} = useSelector((state: RootState) => state.infoReducer);

    return (
        <>
        {showInfo &&
            <Alert
            icon={<InfoIcon fontSize="inherit"/>}
            severity="info"
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    dispatch(hideInfo());
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

export default InfoToolbar;

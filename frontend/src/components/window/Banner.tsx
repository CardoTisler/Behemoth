import {Box, makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import {setUserLoggedOut} from "../../redux/actions/userActions";

const useStyles = makeStyles({
    root: {
        backgroundColor: "#3f51b5",
        textAlign: "left",
        padding: "20px",
        fontSize: 20,
        color: "whitesmoke",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        width: "12%",
        marginRight: "2%",
        justifyContent: "space-between",
        fontSize: "16px",
    },
});

interface Props {
    title: string;
}

const Banner: React.FC<Props> = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {title} = props;
    const classes = useStyles();
    const {isLoggedIn, username} = useSelector((state: RootState) => state.userReducer);
    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(setUserLoggedOut());
    };
    return (
        <Box className={classes.root} boxShadow={4}>
            {title}
            <div className={classes.buttons}>
                <div><Button
                    variant="contained"
                    onClick={handleLogout}>
                    Log out
                </Button></div>
                <div><p>{username}</p></div>
            </div>
        </Box>
    );
};

export default Banner;

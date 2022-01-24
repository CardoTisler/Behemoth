import {Box, makeStyles} from "@material-ui/core";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {setUserLoggedOut} from "../../redux/actions/userActions";
import {RootState} from "../../redux/reducers";

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

const Banner = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {username} = useSelector((state: RootState) => state.userReducer);
    const {bannerTitle} = useSelector((state: RootState) => state.bannerReducer);
    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(setUserLoggedOut());
    };
    return (
        <Box className={classes.root} boxShadow={4}>
            {bannerTitle}
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

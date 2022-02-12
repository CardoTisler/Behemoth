import {Box, makeStyles} from "@material-ui/core";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { setBannerTitle } from "../../redux/actions/bannerActions";
import DateFilter from "./DateFilter";
import Graph from "./Graph";
import SummaryPanels from "./SummaryPanels";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        border: "solid",
        borderWidth: "1px",
        borderColor: "white",
        textAlign: "center",
        width: "100%",
        padding: "20px",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        marginBottom: "1%",
    },
});
const Dashboard: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setBannerTitle({bannerTitle: "Dashboard"}));
    }, []);
    return (
        <Box className={classes.root} boxShadow={4}>
            <div className={classes.header}>
                <SummaryPanels />
                <DateFilter />
            </div>

            <Graph />
        </Box>
    );
};

export default Dashboard;

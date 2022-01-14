import {Box, makeStyles} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React from "react";
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
// TODO: Kirjutada hook mis kontrollib kas sisse logitud, kui ei ss suunab /login?
const Dashboard: React.FC = () => {
    const classes = useStyles();
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

// TODO: Add highlight to currently selected button
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import {BrowserRouter as Router, Link} from "react-router-dom";
import NavButton from "./NavButton";

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
    },
    root: {
        background: "linear-gradient(180deg , #3f51b5 30%, rgb(0 0 0 / 0%) 100%)",
        height: "80vh",
        width: "10%",
    },
});

interface Props {
    onButtonClick: any;
}
const NavigationBar: React.FC<Props> = (props) => {
    const classes = useStyles();

    return (
        <nav className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12} md={12}>
                    <Link to="/dashboard" className={classes.link}>
                        <NavButton text="Dashboard" icon={<DashboardIcon />} onClick={props.onButtonClick}/>
                    </Link>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Link to="/transactions" className={classes.link}>
                        <NavButton text="Transactions" icon={<SyncAltIcon />} onClick={props.onButtonClick}/>
                    </Link>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Link to="/categories" className={classes.link} >
                        <NavButton text="Categories" icon={<LocalAtmIcon />} onClick={props.onButtonClick}/>
                    </Link>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Link to="/reports" className={classes.link}>
                        <NavButton text="Reports" icon={<BarChartIcon />} onClick={props.onButtonClick}/>
                    </Link>
                </Grid>
            </Grid>
        </nav>
    );
};

export default NavigationBar;

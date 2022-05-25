import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import { Link } from 'react-router-dom';
import NavButton from './NavButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { Colors, FontSize, Padding } from '../../utils';
import { Divider } from '@mui/material';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '12%',
        height: '100vh',
        background: `linear-gradient(180deg , ${Colors.white} 30%, rgb(0 0 0 / 0%) 100%)`
    },
    text: {
        textAlign: 'center',
        margin: '12% 0% 0% 0%',
        padding: Padding.m,
        fontSize: FontSize.m,
    },
    link: {
        textDecoration: 'none',
    },
    nav: {},
    divider: {
        // backgroundColor: 'white',
        // background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
    }
});
// TODO: Divider light white with linear gradient on both sides
const NavigationBar = () => {
    const classes = useStyles();
    const { bannerTitle } = useSelector((state: RootState) => state.bannerReducer);

    return (
        <div className={ classes.root }>
            <div className={ classes.text }>
                { bannerTitle }
            </div>
            <Divider variant={'middle'} className={ classes.divider } />
            <nav className={ classes.nav }>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={12}>
                        <Link to="/dashboard" className={classes.link}>
                            <NavButton text="Dashboard" icon={<DashboardIcon />} />
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Link to="/transactions" className={classes.link}>
                            <NavButton text="Transactions" icon={<SyncAltIcon />} />
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Link to="/categories" className={classes.link} >
                            <NavButton text="Categories" icon={<LocalAtmIcon />} />
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Link to="/reports" className={classes.link}>
                            <NavButton text="Reports" icon={<BarChartIcon />} />
                        </Link>
                    </Grid>
                </Grid>
            </nav>
        </div>
    );
};

export default NavigationBar;

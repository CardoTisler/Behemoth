//TODO: Remove the red line below button text, appears after clicking on button
//TODO: Add highlight to currently selected button
import NavButton from './NavButton'
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, Link} from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import BarChartIcon from '@material-ui/icons/BarChart';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(180deg , #3f51b5 30%, rgb(0 0 0 / 0%) 100%)',
        height: '80vh',
        width: '10%'
    }
})

interface Props{
    onButtonClick: () => void;

}
const NavigationBar: React.FC<Props> = (props) => {
    const classes = useStyles()

    return (
        <nav className={classes.root}> 
            <Grid container spacing={0}>
                <Grid item xs={12} md={12}>
                    <Link to="/">
                        <NavButton text='Dashboard' icon={<DashboardIcon />} onClick={props.onButtonClick}/>
                    </Link>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Link to="/transactions">
                        <NavButton text='Transactions' icon={<SyncAltIcon />} onClick={props.onButtonClick}/>
                    </Link>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Link to='/categories'>
                        <NavButton text='Categories' icon={<LocalAtmIcon />} onClick={props.onButtonClick}/>
                    </Link>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Link to='/reports'>
                        <NavButton text='Reports' icon={<BarChartIcon />} onClick={props.onButtonClick}/>
                    </Link>
                </Grid>
            </Grid>
        </nav>
    )
}


export default NavigationBar

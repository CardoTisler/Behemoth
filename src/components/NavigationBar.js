import NavButton from './NavButton'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Link} from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import BarChartIcon from '@material-ui/icons/BarChart';


const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(180deg , #3f51b5 30%, rgb(0 0 0 / 0%) 100%)',
        height: '80vh'
    }
})

const NavigationBar = (props) => {
    const classes = useStyles()

    return (
        // <Router>
        <nav className={classes.root}>
            <ButtonGroup orientation='vertical'>
                <Link to="/">
                    <NavButton text='Dashboard' icon={<DashboardIcon />} onClick={props.onButtonClick}/>
                </Link>
                <Link to="/transactions">
                    <NavButton text='Transactions' icon={<SyncAltIcon />} onClick={props.onButtonClick}/>
                </Link>
                <Link to='/budget'>
                    <NavButton text='Budget' icon={<LocalAtmIcon />} onClick={props.onButtonClick}/>
                </Link>
                <Link to='/reports'>
                    <NavButton text='Reports' icon={<BarChartIcon />} onClick={props.onButtonClick}/>
                </Link>
            </ButtonGroup>
        </nav>
        // </Router>
    )
}

export default NavigationBar

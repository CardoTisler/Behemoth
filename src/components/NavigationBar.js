import NavButton from './NavButton'
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, Link} from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import BarChartIcon from '@material-ui/icons/BarChart';
import {PropTypes} from 'prop-types'
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(180deg , #3f51b5 30%, rgb(0 0 0 / 0%) 100%)',
        height: '80vh',
        width: '10%'
    }
})

//TODO: Wrap buttons into Grid, 1 column - 4 rows, xs, md, ... {12}

const NavigationBar = (props) => {
    const classes = useStyles()

    return (
        <nav className={classes.root}> 
            <Box>
                <Link to="/">
                    <NavButton text='Dashboard' icon={<DashboardIcon />} onClick={props.onButtonClick}/>
                </Link>
                <Link to="/transactions">
                    <NavButton text='Transactions' icon={<SyncAltIcon />} onClick={props.onButtonClick}/>
                </Link>
                <Link to='/categories'>
                    <NavButton text='Categories' icon={<LocalAtmIcon />} onClick={props.onButtonClick}/>
                </Link>
                <Link to='/reports'>
                    <NavButton text='Reports' icon={<BarChartIcon />} onClick={props.onButtonClick}/>
                </Link>
            </Box>
        </nav>
    )
}

NavigationBar.propTypes = {
    onButtonClick: PropTypes.func.isRequired
}

export default NavigationBar

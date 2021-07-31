import NavButton from './NavButton'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles';

import DashboardIcon from '@material-ui/icons/Dashboard';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import BarChartIcon from '@material-ui/icons/BarChart';


const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(180deg , #3f51b5 30%, #eff2f7 100%)',
        height: '80vh'
    }
})

const NavigationBar = (props) => {
    const classes = useStyles()

    return (
        <nav className={classes.root}>
            <ButtonGroup orientation='vertical'>
                <NavButton text='Dashboard' icon={<DashboardIcon />} onClick={props.onButtonClick}/>
                <NavButton text='Transactions' icon={<SyncAltIcon />} onClick={props.onButtonClick}/>
                <NavButton text='Budget' icon={<LocalAtmIcon />} onClick={props.onButtonClick}/>
                <NavButton text='Reports' icon={<BarChartIcon />} onClick={props.onButtonClick}/>
            </ButtonGroup>
        </nav>
    )
}

export default NavigationBar

import NavButton from './NavButton'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles';

import DashboardIcon from '@material-ui/icons/Dashboard';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import BarChartIcon from '@material-ui/icons/BarChart';

const NavigationBar = (props) => {

    return (
        <nav>
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

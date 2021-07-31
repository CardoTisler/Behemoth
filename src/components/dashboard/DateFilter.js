import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRangePicker} from 'react-date-range'

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const DateFilter = () => {
    const handleSelect = (date) => {
        console.log(date); //native Date object
    }

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }
    return (
        <DateRangePicker
        weekStartsOn={1}
        ranges={[selectionRange]}
        onChange={handleSelect} />

    )
}

export default DateFilter

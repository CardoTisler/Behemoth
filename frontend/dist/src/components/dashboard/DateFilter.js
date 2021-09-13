import { jsx as _jsx } from "react/jsx-runtime";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
const DateFilter = () => {
    const handleSelect = (date) => {
        console.log(date); //native Date object
    };
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    };
    return (_jsx(DateRangePicker, { weekStartsOn: 1, ranges: [selectionRange], onChange: handleSelect }, void 0));
};
export default DateFilter;

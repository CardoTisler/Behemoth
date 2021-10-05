import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {DateRangePicker, OnDateRangeChangeProps} from "react-date-range";
import {addDays} from "date-fns/esm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from 'src/redux/reducers';
import { changeDateRange } from 'src/redux/actions/dateFilterActions';

const DateFilter: React.FC = () => {
    const dispatch = useDispatch();
    // const ranges: any = useSelector((state: RootState) => state.dateFilterReducer)
    // console.log(ranges)
    const [state, setState] = useState([
        {
            endDate: addDays(new Date(), 7),
            key: "selection",
            startDate: new Date(),
        },
    ]);

    useEffect(() => {
        console.log("Do nothing.");
    }, [state]);

    return (
        <DateRangePicker
        weekStartsOn={1}
        showSelectionPreview={true}
        ranges={state}
        onChange={(item: any) => setState([item.selection])} />
     );
};

export default DateFilter;

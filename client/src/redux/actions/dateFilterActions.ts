import { DateFilterAction, DateFilterState } from "../reducers/dateFilterReducer";

export const changeDateRange = (payload: DateFilterState): DateFilterAction => {
    return {
        payload,
        type: "CHANGE_DATERANGE",
    };
};

export interface DateFilterState {
    startDateISO: string;
    endDateISO: string;
    key: string;
}

export interface DateFilterAction {
    type: string;
    payload: DateFilterState;
}
const initialState: DateFilterState = {
    endDateISO: new Date("01.01.2021").toISOString(),
    key: "selection",
    startDateISO: new Date("01.01.1970").toISOString(),
};

export const dateFilterReducer = (state: DateFilterState = initialState,
                                  action: DateFilterAction): DateFilterState => {
    const {type, payload} = action;
    switch (type) {
        default:
            return state;

        case "CHANGE_DATERANGE":
            console.log("changing daterange");
            return {...state, ...payload};

    }
};

export default dateFilterReducer;

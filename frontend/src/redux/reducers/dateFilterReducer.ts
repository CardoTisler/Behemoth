export interface DateFilterState {
    startDate: Date;
    endDate: Date;
    key: string;
}

export interface DateFilterAction {
    type: string;
    payload: DateFilterState;
}

const initialState: DateFilterState = {
    endDate: new Date("01.01.1970"),
    key: "selection",
    startDate: new Date("01.01.1970"),
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

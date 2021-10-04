interface DateFilterState {
    startDate: Date,
    endDate: Date,
    key: String
}
export interface DateFilterPayload{
    startDate?: Date,
    endDate?: Date
}
export interface DateFilterAction {
    type: string,
    payload: DateFilterPayload
}

const initialState: DateFilterState = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

export const dateFilterReducer = (state: DateFilterState[] = [initialState], action: DateFilterAction): DateFilterState[] => {
    const {type, payload} = action
    switch(type) {
        default:
            return state

        case 'CHANGE_DATERANGE':
            return {...state, ...payload};
    
    }
} 

export default dateFilterReducer
import { DateFilterAction, DateFilterPayload } from '../reducers/dateFilterReducer'

export const changeDateRange = (payload: DateFilterPayload): DateFilterAction => {
    return {
        type: 'CHANGE_DATERANGE',
        payload
    }
}
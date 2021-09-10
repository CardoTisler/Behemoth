import { Action, State } from "../../Types/Info/Error";

const initialState: State = {
    showError: false,
    message: null,
    title: null
}
const errorReducer = (state = {showError: false, message: null, title: null}, action: Action) => {
    switch (action.type){
        default:
            return state;
            
        case 'SHOW_ERROR':
            const message = action.payload.message
            const title = action.payload.title
            return {
                showError: true,
                title,
                message
            }
        case 'HIDE_ERROR':
            return {
                showError: false,
                message: null,
                title: null
            }
    }
}

export default errorReducer
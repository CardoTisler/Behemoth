import { Action, errorState } from "../../../@types/Info/Error";

const errorReducer = (state: errorState = {showError: false, message: null, title: null}, action: Action) => {
    switch (action.type) {
        default:
            return state;
        case "SHOW_ERROR":
            const message = action.payload.message;
            const title = action.payload.title;
            return {
                showError: true,
                title,
                message,
            };
        case "HIDE_ERROR":
            return {
                showError: false,
                message: null,
                title: null,
            };
    }
};

export default errorReducer;

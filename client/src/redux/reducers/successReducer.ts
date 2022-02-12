import {Action, successState} from "../../../@types/Info/Success";

const successReducer = (state: successState = {showSuccess: false, message: null}, action: Action) => {
    switch (action.type) {
        default:
            return state;

        case "SHOW_SUCCESS":
            return {
                showSuccess: true,
                message: action.payload.message,
            };

        case "HIDE_SUCCESS":
            return {
                showSuccess: false,
                message: null,
            };
    }
};

export default successReducer;

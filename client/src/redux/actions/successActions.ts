import { Action } from "../../../@types/Info/Success";

export const showSuccess = (message: string): Action => {
    return {
        type: "SHOW_SUCCESS",
        payload: {
            message,
        },
    };
};

export const hideSuccess = (): Action => {
    return {
        type: "HIDE_SUCCESS",
        payload: {
            message: "",
        },
    };
};

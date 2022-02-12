import {Action, Payload} from "../../../@types/UserTypes";

export const getUserStatus = (): Action => {
    return {
        type: "GET_USER_STATUS",
        payload: {username: "", isLoggedIn: false},
    };
};

export const setUserLoggedIn = (payload: Payload): Action => {
    return {
        type: "SET_USER_LOGGED_IN",
        payload
    };
};

export const setUserLoggedOut = (): Action => {
    return {
        type: "SET_USER_LOGGED_OUT",
        payload: {username: "", isLoggedIn: false},
    };
};

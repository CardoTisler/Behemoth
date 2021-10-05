interface Action {
    type: string;
    payload: string;
}
export const showInfo = (message: string): Action => {
    return {
        type: "SHOW_INFO",
        payload: message,
    };
};

export const hideInfo = (): Action => {
    return {
        type: "HIDE_INFO",
        payload: "",
    };
};

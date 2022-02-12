export const showLoading = () => {
    return {
        type: "SHOW_LOADING",
        loading: true,
    };
};

export const hideLoading = () => {
    return {
        type: "HIDE_LOADING",
        loading: false,
    };
};

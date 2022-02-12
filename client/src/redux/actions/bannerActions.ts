interface Payload{
    bannerTitle: string;
}
interface Action {
    type: string;
    payload: Payload;
}
export const setBannerTitle = (payload: Payload): Action => {
    return {
        payload,
        type: "SET_BANNER_TITLE",
    };
};

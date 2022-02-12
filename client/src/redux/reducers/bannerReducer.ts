interface BannerState{
    bannerTitle: string;
}
interface BannerAction {
    type: string;
    payload: BannerState;
}
const initialState = {
    bannerTitle: "Dashboard",
};

export const bannerReducer = (state: BannerState = initialState, action: BannerAction): BannerState => {
    switch (action.type) {
        default:
            return {...state};
        case "SET_BANNER_TITLE":
            return {bannerTitle: action.payload.bannerTitle};
    }
};

export default bannerReducer;

interface UserStatus {
    username: string;
    isLoggedIn: boolean;
}

const userReducer = (state: any = {isLoggedIn: false, username: ""}, action: any): UserStatus => {
    switch ( action.type ) {
        default:
            return {...state};
        case "GET_USER_STATUS":
            return {...state};
        case "SET_USER_LOGGED_IN":
            return {...action.payload};
        case "SET_USER_LOGGED_OUT":
            return {username: "", isLoggedIn: false};
    }
};

export default userReducer;

export interface Action {
    type: string;
    payload: Payload;
}

export interface Payload {
    username: string;
    isLoggedIn: boolean;
}

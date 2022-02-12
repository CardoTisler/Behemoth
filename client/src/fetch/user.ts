import {handleResponse} from "./common";

interface User {
    username: string;
    password: string;
}
export const sendLoginRequest = async (user: User) => {
    return await fetch("/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password: user.password,
            username: user.username,
        }),
    }).then(handleResponse)
        .then((res: any) => res)
        .catch((err: Error) => {
            throw new Error(err.message);
        });
};

export const sendRegisterRequest = async (user: User) => {
    return await fetch("/register", {
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    }).then(handleResponse)
        .then((res: any) => res)
        .catch((err: Error) => {
            throw new Error(err.message);
        });
};

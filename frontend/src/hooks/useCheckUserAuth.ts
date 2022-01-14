import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {setUserLoggedIn, setUserLoggedOut} from "../redux/actions/userActions";

export const useCheckUserAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    useEffect( () => {
        function getIsLoggedIn() {
            const token = (localStorage.getItem("token")) as string;
            fetch("/isUserAuth", {
                headers: {
                    "x-access-token": token,
                },
            })
                .then((res: any) => {
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        throw new Error();
                    }
                }).then((data: any) => {
                    setIsLoggedIn(true);
                    setUsername(data.username);
                    dispatch(setUserLoggedIn({username, isLoggedIn}));
            }).catch((err: Error) => {
                setIsLoggedIn(false);
                dispatch(setUserLoggedOut());
            });
        }
        getIsLoggedIn();
    }, []);
    return {isLoggedIn, username};
};

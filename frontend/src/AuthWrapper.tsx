import {Router} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {Route, Switch, useHistory} from "react-router-dom";
import Register from "../src/components/user/Register";
import App from "./App";
import Login from "./components/user/Login";
import {setUserLoggedIn} from "./redux/actions/userActions";
import {RootState} from "./redux/reducers";
import {useState} from "react";
interface CheckUserAuth {
    tokenValid: boolean;
    username: string;
}

const isTokenValid = (): Promise<CheckUserAuth> => {
    const token = (localStorage.getItem("token")) as string;
    const result = fetch("/isUserAuth", {
        headers: {
            "x-access-token": token,
        },
    }).then((resp) => {
        if (resp.status === 200) {
            return resp.json();
        } else {
            throw new Error();
        }
    }).then((data: any) => {
        return {
            tokenValid: true,
            username: data.username,
        };
    }).catch((err: Error) => {
        return {
            tokenValid: false,
            username: "",
        };
    });
    return result;
};

const AuthWrapper = () => {
    console.log("Authwrapper rendered.");
    const dispatch = useDispatch();
    const history = useHistory();
    const {isLoggedIn} = useSelector((state: RootState) => state.userReducer);
    if (!isLoggedIn) {
        isTokenValid()
            .then((data: any) => {
                if (data.tokenValid) {
                    console.log("Token valid. dispatch setuserloggedin");
                    dispatch(setUserLoggedIn({isLoggedIn: true, username: data.username}));
                    history.push("/");
                } else {
                    history.push("/login");
                }
            }).catch((err: Error) => {
            console.error(err.message);
        });
    }
    return (
        <>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </Switch>
        </>
    );
};

export default AuthWrapper;

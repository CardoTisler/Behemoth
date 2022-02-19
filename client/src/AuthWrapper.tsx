import {useDispatch, useSelector} from "react-redux";
import {Route, Switch, useHistory} from "react-router-dom";
import Register from "../src/components/user/Register";
import App from "./App";
import Login from "./components/user/Login";
import {setUserLoggedIn} from "./redux/actions/userActions";
import {RootState} from "./redux/reducers";
import {handleResponse} from "./fetch/common";
import {logger} from "./logger";

logger.defaultMeta = {service: "AuthWrapper.tsx"}

interface CheckUserAuth {
    tokenValid: boolean;
    username: string;
}
const isTokenValid = (): Promise<CheckUserAuth> => {
    logger.info(`Checking if existing token is valid.`)
    const token = (localStorage.getItem("token")) as string;
    const result = fetch("/isUserAuth", {
        headers: {
            "x-access-token": token,
        },
    }).then(handleResponse)
        .then((data: any) => {
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
    const dispatch = useDispatch();
    const history = useHistory();
    const {isLoggedIn} = useSelector((state: RootState) => state.userReducer);
    if (!isLoggedIn) {
        isTokenValid()
            .then((data: any) => {
                if (data.tokenValid) {
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
                {isLoggedIn && <Route exact path="/" component={App} />}
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </Switch>
        </>
    );
};

export default AuthWrapper;

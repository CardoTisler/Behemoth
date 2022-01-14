import {makeStyles} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import {useTitle} from "react-use";
import Login from "../src/components/user/Login";
import "./App.css";
import Categories from "./components/categories/Categories";
import Dashboard from "./components/dashboard/Dashboard";
import ErrorToolbar from "./components/info/ErrorToolbar";
import InfoToolbar from "./components/info/InfoToolbar";
import SuccessToolbar from "./components/info/SuccessToolbar";
import Reports from "./components/reports/Reports";
import Transactions from "./components/transactions/Transactions";
import Banner from "./components/window/Banner";
import NavigationBar from "./components/window/NavigationBar";
import {useCheckUserAuth} from "./hooks/useCheckUserAuth";
import {useFetchCategories} from "./hooks/useFetchCategories";
import {useFetchTransactions} from "./hooks/useFetchTransactions";
import {loadCategories} from "./redux/actions/categoryActions";
import {loadTransactions} from "./redux/actions/transactionActions";
import {RootState} from "./redux/reducers";
import {setUserLoggedIn, setUserLoggedOut} from "./redux/actions/userActions";
// TODO: Store current tab for Banner in redux store
const useStyles = makeStyles({
    root: {
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
    }, frameStyles: {
        margin: "3rem",
        width: "100%",
    }, content: {
        display: "flex",
        flexDirection: "row",
    },
});
function App() {
    useTitle("Categorizer");
    const classes = useStyles();
    const history = useHistory();
    // TODO: Receive value from redux store, default empty string probably
    const [bannerTitle, setBannerTitle] = useState("Dashboard");
    const handleBannerText = (componentName: string) => {
        setBannerTitle(componentName);
    };
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector((state: RootState) => state.userReducer);
    const {incomeCategories, expenseCategories, noneCategory, categoryError} = useFetchCategories();
    const {transactionsList, error} = useFetchTransactions();

    useEffect(() => {
        if (!categoryError && !error && isLoggedIn) {
            dispatch(loadCategories({
                expenseCategories,
                incomeCategories,
                noneCategory,
            }));
            dispatch(loadTransactions(transactionsList));
        }
    }, [incomeCategories, expenseCategories, noneCategory, transactionsList]);

    return (
        <div className={classes.root}>
            {isLoggedIn && <Banner title={bannerTitle}/>}
            <div className={classes.content}>
                {isLoggedIn
                    ? <Router>
                        <NavigationBar onButtonClick={handleBannerText}/>
                        <div className={classes.frameStyles}>
                            <ErrorToolbar/>
                            <SuccessToolbar/>
                            <InfoToolbar/>

                            <Switch>
                                <Route exact path="/dashboard" component={Dashboard}/>
                                <Route exact path="/transactions" component={Transactions}/>
                                <Route exact path="/categories" component={Categories}/>
                                <Route exact path="/reports" component={Reports}/>
                            </Switch>
                        </div>
                    </Router>
                    :
                    <Router>
                        <Switch>
                            <Route exact path="/login" component={Login}/>
                        </Switch>
                    </Router>
                }
            </div>
        </div>
    );

}

export default App;

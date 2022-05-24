import {makeStyles} from "@material-ui/core";
import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useTitle} from "react-use";
import Login from "./components/user/Login";
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
import { useFetchCategories } from "./hooks/useFetchCategories";
import { useFetchTransactions } from "./hooks/useFetchTransactions";
import { loadCategories } from "./redux/actions/categoryActions";
import { loadTransactions } from "./redux/actions/transactionActions";
import { RootState } from "./redux/reducers";
import { Colors } from './utils';

const useStyles = makeStyles({
    root: {
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        backgroundColor: Colors.lightGray,
    }, frameStyles: {
        margin: "3rem",
        width: "90%",
    }, content: {
        display: "flex",
        flexDirection: "column",
        width: '100%',
    },
});
// TODO: Redirect to /dashboard after mount
function App() {
    useTitle('Categorizer');
    const classes = useStyles();
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
            <Router>
                {isLoggedIn && <NavigationBar/>}
                <div className={classes.content}>
                    {isLoggedIn
                        ? <>
                            <Banner/>
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
                        </>
                        :
                            <Switch>
                                <Route exact path="/login" component={Login}/>
                            </Switch>
                    }
                </div>
            </Router>
        </div>
    );

}

export default App;

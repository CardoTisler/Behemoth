import { makeStyles } from "@material-ui/core";
import {SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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
  const classes = useStyles();
  const [bannerTitle, setBannerTitle] = useState("Dashboard");
  const handleBannerText = (componentName: string) => { setBannerTitle(componentName); };

  const dispatch = useDispatch();
  const fetchData = useFetchCategories();
  const {incomeCategories, expenseCategories, noneCategory} = fetchData.allCategories;
  const {transactionsList, error} = useFetchTransactions();
  const categoriesError = fetchData.error;

  useEffect( () => {
      if (!categoriesError && !error) {
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
      <Banner title={bannerTitle}/>
        <div className={classes.content}>
          <Router>
            <NavigationBar onButtonClick={handleBannerText}/>

            <div className={classes.frameStyles}>
              <ErrorToolbar />
              <SuccessToolbar />
              <InfoToolbar />

              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/transactions" component={Transactions} />
                <Route exact path="/categories" component={Categories} />
                <Route exact path="/reports" component={Reports} />
              </Switch>
            </div>
          </Router>
        </div>
    </div>
  );

}

export default App;

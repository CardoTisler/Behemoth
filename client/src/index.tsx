import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import AuthWrapper from "./AuthWrapper";
import "./index.css";
import allReducers from "./redux/reducers";
import reportWebVitals from "./reportWebVitals";

const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={ store }>
    <React.StrictMode>
        <Router>
            <AuthWrapper />
        </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

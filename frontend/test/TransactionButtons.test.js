import React from "react";
import TransactionButtons from "../src/components/transactions/TransactionButtons";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import allReducers from "../src/redux/reducers"
const store = createStore(allReducers);

describe("Test TransactionButtons component", () =>{

    test("TransactionButtons component", () => {
        render(
            <Provider store={store}>
                <TransactionButtons />
            </Provider>
        )
        console.log(screen.queryAllByText("Delete Transactions"))
    })

})
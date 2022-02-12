import {Grid} from "@material-ui/core";
import {useState} from "react";
import { useSelector } from "react-redux";
import { Transaction } from "../../../@types/TransactionTypes/Transaction";
import { RootState } from "../../redux/reducers";
import TransactionsHeader from "./TransactionsHeader";
import TransactionsRow from "./TransactionsRow";

const TransactionsList = () => {
    const transactionsList = useSelector(({transactionReducer}: RootState) => transactionReducer);
    const [isChecked, setIsChecked] = useState(false);
    const renderRows = () => {
        return(transactionsList.map((element: Transaction)  => {
            return(
                <Grid item xs={12} key={element._id}>
                    <TransactionsRow
                    data={element}
                    isAllChecked={isChecked}/>
                </Grid> );
        }));
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TransactionsHeader
                checkAll={setIsChecked}/>
            </Grid>

            {renderRows()}
        </Grid>
    );
};

export default TransactionsList;

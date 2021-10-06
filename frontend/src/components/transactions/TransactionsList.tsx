import {Grid} from "@material-ui/core";
import { useSelector } from "react-redux";
import { ITransaction } from "../../../@types/TransactionTypes/ITransaction";
import { RootState } from "../../redux/reducers";
import TransactionsHeader from "./TransactionsHeader";
import TransactionsRow from "./TransactionsRow";

const TransactionsList = () => {
    const transactionsList = useSelector(({transactionReducer}: RootState) => transactionReducer);
    const renderRows = () => {
        return(transactionsList.map((element: ITransaction)  => {
            return(
                <Grid item xs={12} key={element._id}>
                    <TransactionsRow
                    data={element}/>
                </Grid> );
        }));
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TransactionsHeader />
            </Grid>

            {renderRows()}
        </Grid>
    );
};

export default TransactionsList;

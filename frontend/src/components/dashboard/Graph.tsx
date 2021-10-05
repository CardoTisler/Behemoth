import { useDispatch, useSelector } from "react-redux";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { showError } from "src/redux/actions/errorActions";
import { RootState } from "src/redux/reducers";
import { getDataForGraph } from "./graphParse";

const Graph: React.FC = () => {
    const expenseCategories = useSelector((state: RootState) => state.categoryReducer.expenseCategories);
    const transactions = useSelector((state: RootState) => state.transactionReducer);
    const {data, error} = getDataForGraph(transactions, expenseCategories);
    const dispatch = useDispatch();

    if (error) { dispatch(showError(`Can not visualize expenses.`, error)); }

    return (
        <ResponsiveContainer width="90%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar name="Planned Budget" dataKey="pv" fill="#3159eb" />
                <Bar name="Actual Expenses" dataKey="uv" fill="#0fc6fc" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Graph;

import { useSelector } from "react-redux"
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { RootState } from "src/redux/reducers"
import { getDataForGraph } from "./graphParse"

const Graph: React.FC = () => {
    const expenseCategories = useSelector((state: RootState) => state.categoryReducer.expenseCategories)
    const transactions = useSelector((state: RootState) => state.transactionReducer)
    const {data} = getDataForGraph(transactions, expenseCategories)
    
    return (
        <ResponsiveContainer width='90%' height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar name='Planned Budget' dataKey="pv" fill="#3159eb" />
                <Bar name='Actual Expenses' dataKey="uv" fill="#0fc6fc" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default Graph

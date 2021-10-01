import { Category } from "../../../@types/CategoryTypes/category";
import { Transaction } from "../../../@types/TransactionTypes/Transaction";

interface graphBar{
    name: string,
    uv: number, //expense
    pv: number //budget of category

}
interface graphData{
    data: graphBar[],
    error: string | null
}

export const getDataForGraph = (transactions: Transaction[], expenseCategories: Category[]): graphData => {
    return mapTransactionsAmountsToGDO(transactions, expenseCategories)
}

//GDO = Graph Data Object (each GDO represents a dual-bar value in the dashboard graph)
const mapCategoriesToGDO = (expenseCategories: Category[]): graphData => {
    const mappedCategories = expenseCategories.map((category: Category) => {
        return {
            name: category.name,
            pv: category.budget,
            uv: 0
        }
    })
    return {data: [...mappedCategories], error: null}
}

//GDO = Graph Data Object (each GDO represents a dual-bar value in the dashboard graph)
const mapTransactionsAmountsToGDO = (transactions: Transaction[], expenseCategories: Category[]): graphData => {
    const {data} = mapCategoriesToGDO(expenseCategories)
    transactions.forEach((transaction: Transaction) => {
        if(typeof transaction.category !== 'string'){
            if(transaction.category.type === 'Expense'){
                const amount = handleAmountFormat(transaction.amount)
                const categoryKey = transaction.category.name
                
                for(let i = 0; i < data.length; i++){ //find transactions's category from list of all categories
                    const graphDataObject = data[i]
                    if(graphDataObject.name === categoryKey){ //if category from list matches category of transaction
                        let chartCategoryExpenseTotal = graphDataObject.uv + amount //take current expense total of prev transactions and sum new
                        graphDataObject.uv = chartCategoryExpenseTotal //insert new value to GDO
                        break;
                    }
                }
            }
        } else {
            return {data: [], error: 'Cannot map unpopulated Transactions to Dashboard graph.'}
        }
    })
    return {data, error: null}
}

const handleAmountFormat = (entry: string | number): number => {
    if(typeof entry === 'string'){
        return parseFloat(Math.abs(parseFloat(entry)).toFixed(2))
    } else {
        return parseFloat(Math.abs(entry).toFixed(2))
    }
}
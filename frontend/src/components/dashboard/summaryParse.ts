import { Category } from "../../../@types/CategoryTypes/category";
import { showError } from "src/redux/actions/errorActions";
import { Transaction } from "../../../@types/TransactionTypes/Transaction";

interface summarizeTransactions {
    income: string,
    expenses: string,
    savings: string
}
interface summarizedData {
    income: string,
    expenses: string,
    budget: string,
    savings: string
}
//income is the sum of all transactions that have category type Income
//expenses is the sum of all transactions that have category type Expense
//budget is the ratio between Expenses and the sum of Expense category budgets
//savings is the division between income and expenses

const parseTransactionAmounts = (transactions: Transaction[]): summarizeTransactions => {
    let income: number = 0
    let expenses: number = 0

    transactions.forEach((transaction: Transaction) => {
        if(typeof transaction.category != 'string'){
            switch (transaction.category.type){
                default:
                    return; //transaction type none, dont take this data to account
                case 'Income':
                    income += handleIncomeTransaction(transaction)
                    return;

                case 'Expense':
                    expenses += handleExpenseTransaction(transaction)
                    return;
                }
        } else {
            //TODO: Add error handling here. Error is caused by unpopulated transactions.
        }
    })

    let savings: number = income - expenses
    return {
        income: income.toFixed(2).concat('€'),
        expenses: expenses.toFixed(2).concat('€'),
        savings: savings.toFixed(2).concat('€')
    }
}

function handleIncomeTransaction(transaction: Transaction): number {
    const income = transaction.amount
    if(typeof income == 'string'){
        return parseFloat(income)
    }
    return income
}

function handleExpenseTransaction(transaction: Transaction) {
    //if expense, the incoming amount will have a dash infront of it (negative number)
    let expense = transaction.amount
    if(typeof expense === 'string'){
        expense = expense.replace('-', '')
        return parseFloat(expense)
    } else {
        return Math.abs(expense)
    }
}

export const getSummaryData = (transactions: Transaction[], expenseCategories: Category[]): summarizedData => {
    const {income, expenses, savings} = parseTransactionAmounts(transactions)
    const {budgetTotal} = parseExpenseCategories(expenseCategories)
    const budget = expenses + '/' + budgetTotal
    return {
        income,
        expenses,
        savings,
        budget
    }
}

function parseExpenseCategories(expenseCategories: Category[]) {
    let budgetTotal = 0;
    expenseCategories.forEach((category: Category) => {
        budgetTotal += category.budget
    })
    return {budgetTotal: budgetTotal.toFixed(2).concat('€')}
}

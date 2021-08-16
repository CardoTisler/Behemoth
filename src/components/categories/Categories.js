import { Box } from "@material-ui/core";
import CategoryList from './CategoryList'
import {useState} from 'react'
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
    listStyling: {
        display: 'flex',
        flexDirection: 'row',
        margin: '1%'
    }
})

//TODO: add categoriesHeader component that takes in both hooks
//the header component should have (maybe radiobutton?) option to choose between income and expenses
//cateogory and a button to add the category to the appropriate list

const Categories = (props) => {
    const [incomeList, setIncomeList] = useState(['Salary', 'Investments', 'Other'])
    const [expensesList, setExpensesList] = useState(['Rent', 'Food', 'Clothes', 'Leisure', 'Eating Out'])
    const classes = useStyles()
    
    return (
        <Box>
            {/* header */}
            <div> 

            </div>
            {/* content */}
            <div className={classes.listStyling}>
                <CategoryList listTitle='Income Categories' list={incomeList}/>
                <CategoryList listTitle='Expenses Categories' list={expensesList} />
            </div>
        </Box>
    )
}

export default Categories;

import { Box } from "@material-ui/core";
import CategoryList from './CategoryList'
import CategoryForm from './CategoryForm'
import {useState} from 'react'
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
    listStyling: {
        display: 'flex',
        flexDirection: 'row',
        margin: '1%'
    },
    boxStyling: {
        display: 'flex',
        flexDirection: 'column'
    }
})

//TODO: add categoriesHeader component that takes in both hooks
//the header component should have (maybe radiobutton?) option to choose between income and expenses
//cateogory and a button to add the category to the appropriate list

const Categories = (props) => {
    const classes = useStyles()
    
    return (
        <Box className={classes.boxStyling}>
            {/* header */}
            <div> 
                <CategoryForm />
            </div>
            {/* content */}
            <div className={classes.listStyling}>
                <CategoryList listTitle='Income Categories' list={props.incomeList}/>
                <CategoryList listTitle='Expenses Categories' list={props.expensesList} />
            </div>
        </Box>
    )
}

export default Categories;

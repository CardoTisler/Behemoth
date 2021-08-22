import { Grid } from "@material-ui/core";
import CategoryList from './CategoryList'
import CategoryForm from './CategoryForm'
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
    root: {
        width: '100%'
    },
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

const Categories = (props) => {
    const classes = useStyles()
    
    return (
        <Grid container spacing={3}>
            {/* header */}
            <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}> 
                        <CategoryForm addIncome={props.addIncome} addExpense={props.addExpense}/>
                    </Grid>
                </Grid>
            </Grid>
            {/* content */}

            <Grid item xs={12} md={6}>
                <CategoryList listTitle='Income Categories' list={props.incomeList} addCategory={props.addIncome} deleteCategory = {props.deleteIncome}/>
            </Grid>

            <Grid item xs={12} md={6}>
                <CategoryList listTitle='Expenses Categories' list={props.expensesList} addCategory={props.addExpense} deleteCategory = {props.deleteExpense}/>
            </Grid>
            
        </Grid>
    )
}

export default Categories;

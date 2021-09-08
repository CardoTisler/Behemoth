import { Grid } from "@material-ui/core";
import CategoryList from './CategoryList'
import CategoryForm from './CategoryForm'
import { useSelector } from 'react-redux'

  //TODO: Create code system for frontend-backend communication (1 - OK, 2 - Adding category failed because category exists, 3 - Adding category failed because no db connection and so forth)

const Categories = (props) => {
    const {
        incomeCategories,
        expenseCategories } = useSelector(state => state.categoryReducer)

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}> 
                        <CategoryForm />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
                <CategoryList 
                listTitle='Income Categories' 
                listArr={incomeCategories} />
            </Grid>

            <Grid item xs={12} md={6}>
                <CategoryList 
                listTitle='Expenses Categories' 
                listArr={expenseCategories} />
            </Grid>
            
        </Grid>
    )
}

export default Categories;

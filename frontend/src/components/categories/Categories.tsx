import { Grid } from "@material-ui/core";
import CategoryList from './CategoryList'
import CategoryForm from './CategoryForm'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../redux/reducers";
  
const Categories: React.FC = () => {
    const {
        incomeCategories,
        expenseCategories } = useSelector((state: RootState) => state.categoryReducer)

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
                listArr={incomeCategories} 
                />
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

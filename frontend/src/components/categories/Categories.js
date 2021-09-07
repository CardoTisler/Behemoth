import { Grid } from "@material-ui/core";
import CategoryList from './CategoryList'
import CategoryForm from './CategoryForm'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {loadCategories} from '../../redux/actions/categoryActions'

  //TODO: Create code system for frontend-backend communication (1 - OK, 2 - Adding category failed because category exists, 3 - Adding category failed because no db connection and so forth)
const getData = async () => {
    try {
        const response = await fetch('categories/show');
        const data = await response.json()
        return data
    } catch (err) {
        console.log(err) }
}

const Categories = (props) => {
    const dispatch = useDispatch()
    const {
        incomeCategories,
        expenseCategories, 
        noneCategory} = useSelector(state => state.categoryReducer)
    

    useEffect( () => { //TODO: Create custom useCategoriesFetch hook, replace here and in TransactionsList.js OR call this in app.js and pass to children
        async function fetch(){
            await getData().then(res => {
                if(res.status === 200){
                    dispatch(loadCategories({
                        incomeCategories: [...res.incomeList],
                        expenseCategories: [...res.expensesList],
                        noneCategory: [...res.noneCategory]
                    }))
                } else if (res.status === 400){
                    console.log('Error getting lists from database')
                }
            }).catch(err => {
                console.log(err)
                console.log('Error making get/show request to database.')
            })
        }
        fetch()
    }, [])

    //TODO: Replace elementName with element _id? Perhaps not necessary since duplicates not needed, need to decide.
    const handleIncomeItemDelete = (elementName) => { 
        //setIncomeList(incomeList.filter( (element) => element.category !== elementName))
    }
    const handleExpenseItemDelete = (elementName) => { 
        //setExpensesList(expensesList.filter( (element) => element.category !== elementName))
    }

    const handleListUpdate = (isIncomeCategory, newItem) => {
        if(isIncomeCategory){
            //setIncomeList([...incomeList, newItem])
        } else {
            //setExpensesList([...expensesList, newItem])
        }
    }
    return (
        <Grid container spacing={3}>
            {/* header */}
            <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}> 
                        <CategoryForm
                        updateList={handleListUpdate} />
                    </Grid>
                </Grid>
            </Grid>
            {/* content */}

            <Grid item xs={12} md={6}>
                <CategoryList 
                listTitle='Income Categories' 
                listArr={incomeCategories}
                noneCategory={noneCategory} 
                deleteCategory={handleIncomeItemDelete}/>
            </Grid>

            <Grid item xs={12} md={6}>
                <CategoryList 
                listTitle='Expenses Categories' 
                listArr={expenseCategories}
                noneCategory={noneCategory} 
                deleteCategory={handleExpenseItemDelete}/>
            </Grid>
            
        </Grid>
    )
}

export default Categories;

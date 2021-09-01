import { Grid } from "@material-ui/core";
import CategoryList from './CategoryList'
import CategoryForm from './CategoryForm'
import {useState, useEffect} from 'react'

//FIXME: Fix this monster
// const getData = async (setIncomeList, setExpensesList) => {
//     try {
//         const response = await fetch('categories/show');

//         const data = await response.json().then(result => {
//             console.log('getData request success')
//             setIncomeList(result.income)
//             setExpensesList(result.expenses)
//             return function cleanup(){ //cleanup method, removing this causes a memory leak and app crash shortly after
//                 console.log('cleanup function')
//             }
//         })
//     } catch (err) { console.log(err) }
//   }

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
    const [incomeList, setIncomeList] = useState([])
    const [expensesList, setExpensesList] = useState([])
    
    useEffect( () => {
        async function fetch(){
            const response = await getData().then(data => {
                setIncomeList([...data.incomeList])
                setExpensesList([...data.expensesList])
            }).catch(err => {
                console.log(err)
            })
        }
        fetch()
    }, [])

    //TODO: Replace elementName with element _id? Perhaps not necessary since duplicates not needed, need to decide.
    const handleIncomeItemDelete = (elementName) => { setIncomeList(incomeList.filter( (element) => element.category !== elementName))}
    const handleExpenseItemDelete = (elementName) => { setExpensesList(expensesList.filter( (element) => element.category !== elementName))}

    const handleListUpdate = (isIncomeCategory, newItem) => {
        if(isIncomeCategory){
            setIncomeList([...incomeList, newItem])
        } else {
            setExpensesList([...expensesList, newItem])
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
                <CategoryList listTitle='Income Categories' listArr={incomeList} deleteCategory={handleIncomeItemDelete}/>
            </Grid>

            <Grid item xs={12} md={6}>
                <CategoryList listTitle='Expenses Categories' listArr={expensesList} deleteCategory={handleExpenseItemDelete}/>
            </Grid>
            
        </Grid>
    )
}

export default Categories;

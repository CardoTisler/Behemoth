import {useState, useEffect} from 'react'
import {Grid} from '@material-ui/core'
import TransactionsHeader from './TransactionsHeader'
import TransactionsRow from './TransactionsRow'
import RowDropdown from './RowDropdown'
//expects array with objects of data
const renderRows = (data, incomeList, expensesList) => {
    return(data.map(element => {
        console.log(element.category.id)
        return(
            <Grid item xs={12} key={element.id}>
                <TransactionsRow 
                data={element}
                incomeList={incomeList} 
                expenseList={expensesList}/>
            </Grid> )
    }))
}
//request categories, separate into incomeCategories and expenseCategories
const getData = async () => {
    try {
        const response = await fetch('categories/show');
        const data = await response.json()
        return data
    } catch (err) {
        console.log(err) }
}

//TODO: Get request for receiving all categories and passing the values to TransactionsRow component
const TransactionsList = (props) => {  
    const [incomeCategoriesList, setIncomeList] = useState([])
    const [expensesCategoriesList, setExpensesList] = useState([])
    
    useEffect( () => { //TODO: Create custom useCategoriesFetch hook, replace here and in TransactionsList.js
        async function fetch(){
            await getData().then(res => {
                if(res.status === 200){
                    setIncomeList([...res.incomeList])
                    setExpensesList([...res.expensesList])
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

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TransactionsHeader />
            </Grid>

            {renderRows(props.list, incomeCategoriesList, expensesCategoriesList)}
        </Grid>
    )
}

export default TransactionsList

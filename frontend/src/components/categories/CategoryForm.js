import { Box, TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core'

//TODO: Form UI changes - UI can be finalized.

const useStyles = makeStyles({
    root: {
        padding: '1rem',
        width: '100%',
        height: '8rem',
    }, formLayout: {
        display: 'flex',
        flexDirection: 'row'
    }, errorText: {
        color: 'red',
        fontSize: '0.8rem'
    }, buttonLayout: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        justifyContent: 'space-between',
        width: '8rem'
    }, textFields: {
        display: 'flex',
        flexDirection: 'column'
    }, incomeButton: {
        backgroundColor: 'green'
    }, expensesButton: {
        backgroundColor: 'red'
    }
})

const addToDatabase = async (url, data) => {
    try{
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return response.json()
    } catch (err) {
        console.log(err)
    }
}
const CategoryForm = (props) => {
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [isIncomeCategory, setIsIncomeCategory] = useState(true)
    const [state, setState] = useState({
        category: '',
        budget: '',
    })
    const classes = useStyles()

    //toggle between Income and Expenses categories
    //TODO: Can add straight to code that uses it?
    const handleCategoryChange = () => {
        setIsIncomeCategory(!isIncomeCategory)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //build object with data from states
        const data = {category: state.category, budget: state.budget, isIncomeCategory}
        //TODO: add input validation method to handleSubmit, handleSubmit should not continue if validation
        //method returns false. The validation method should accept the budget value and make sure it is
        //parseable to integer

        //send data to parent
        // if(state.category){
        //     if(isIncomeCategory){
        //         props.addIncome(data)
        //     } else {
        //         if(validateInteger(state.budget)){
        //             props.addExpense(data)
        //         } else { return }
        //     }
        // }
        
        addToDatabase('/categories/new', data).then((res) => {
            if(res.status === 200){
                if(isIncomeCategory){
                    props.updateList(true, res.addedItem)
                } else {
                    props.updateList(false, res.addedItem)
                }
            } else {
                console.log('Cannot add new Category.')
                //TODO: Add logic to UI for showing add failure.
            }
        }).catch(err => {
            console.log('error adding to database: ')
            console.log(err)
        })
        //clear state value after sending data
        setState({
            category: "",
            budget: ""
        })
    }

    
    const handleInput = (e) => {
        //dynamic state update based on input in textfield
        if(e.target.name === 'categoryNameField'){
            setState({ ...state, category: e.target.value })
        } else {
            //this regex checks if value contains only numbers
            if(/^\d+$/.test(e.target.value) || e.target.value === ""){
                setState({...state, budget: e.target.value})
                if(showErrorMessage) { //TODO: Replace with Material UI helpertext
                    setShowErrorMessage(false)
                }
            } else {
                if(e.target.value !== ""){
                    setShowErrorMessage(true)
                }
                setState({...state, budget: e.target.value})
            }
        }
    }

    return (
        <Box className={classes.root} boxShadow={4}>
            <form onSubmit={handleSubmit} className={classes.formLayout}>
                {/* Input for category name */}

                <div className={classes.textFields}>
                    <TextField 
                    label='Category Name'
                    name='categoryNameField'
                    value={state.category}
                    onChange={handleInput}/>

                {!isIncomeCategory &&
                    <TextField 
                    label='Monthly Budget (€)'
                    name='budgetValueField'
                    value={state.budget}
                    onChange={handleInput}/>}

                    {showErrorMessage && <p className={classes.errorText}>Invalid input!</p>}
                </div>
                <div className={classes.buttonLayout}>
                        <Button 
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        color="primary">Add</Button>

                        <Button
                        className={isIncomeCategory ? classes.incomeButton : classes.expensesButton}
                        variant='contained'
                        color='primary'
                        onClick={handleCategoryChange}>
                            {isIncomeCategory ? 'Income' : 'Expenses'}
                        </Button>
                </div>
            </form>
        </Box>
    )
}

export default CategoryForm

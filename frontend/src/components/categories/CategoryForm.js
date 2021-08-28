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

const validateInteger = (input) => {
    return /^\d+$/.test(input)
}

const CategoryForm = (props) => {
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [state, setState] = useState({
        categoryName: '',
        categoryBudget: '',
        isIncomeCategory: true
    })
    const classes = useStyles()

    //toggle between Income and Expenses categories
    const handleCategoryChange = () => {
        const currentCategory = state.isIncomeCategory
        setState({...state, isIncomeCategory: !currentCategory})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //build object with data from states
        const data = {categoryName: state.categoryName, categoryBudget: state.categoryBudget}
        //TODO: add input validation method to handleSubmit, handleSubmit should not continue if validation
        //method returns false. The validation method should accept the budget value and make sure it is
        //parseable to integer

        //send data to parent
        if(state.categoryName){
            if(state.isIncomeCategory){
                props.addIncome(data)
            } else {
                if(validateInteger(data.categoryBudget)){
                    console.log('adding')
                    props.addExpense(data)
                } else { return }
            }
        }

        //clear state value after sending data
        setState({
            ...state,
            categoryName: "",
            categoryBudget: ""
        })
    }

    
    const handleInput = (e) => {
        //dynamic state update based on input in textfield
        if(e.target.name === 'categoryNameField'){
            setState({ ...state, categoryName: e.target.value })
        } else {
            //this regex checks if value contains only numbers
            if(/^\d+$/.test(e.target.value) || e.target.value === ""){
                setState({...state, categoryBudget: e.target.value})
                if(showErrorMessage) {
                    setShowErrorMessage(false)
                }
            } else {
                if(e.target.value !== ""){
                    setShowErrorMessage(true)
                }
                setState({...state, categoryBudget: e.target.value})
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
                    value={state.categoryName}
                    onChange={handleInput}/>

                {!state.isIncomeCategory &&
                    <TextField 
                    label='Monthly Budget (€)'
                    name='budgetValueField'
                    value={state.categoryBudget}
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
                        className={state.isIncomeCategory ? classes.incomeButton : classes.expensesButton}
                        variant='contained'
                        color='primary'
                        onClick={handleCategoryChange}>
                            {state.isIncomeCategory ? 'Income' : 'Expenses'}
                        </Button>
                </div>
            </form>
        </Box>
    )
}

export default CategoryForm

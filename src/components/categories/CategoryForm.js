import { Box, TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core'

//TODO: Form UI changes - UI can be finalized.

const useStyles = makeStyles({
    root: {
        padding: '1rem',
        width: '100%',
        // border: 'solid',
        // borderWidth: '1px',
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
    const [isIncomeCategory, setIsIncomeCategory] = useState(true)
    const [categoryName, setCategoryName] = useState("")
    const [categoryBudget, setCategoryBudget] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const classes = useStyles()

    //toggle between Income and Expenses categories
    const handleCategoryChange = () => {
        setIsIncomeCategory(!isIncomeCategory)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //build object with data from states
        const data = {categoryName, categoryBudget}
        //TODO: add input validation method to handleSubmit, handleSubmit should not continue if validation
        //method returns false. The validation method should accept the budget value and make sure it is
        //parseable to integer


        //send data to parent
        if(categoryName){
            if(isIncomeCategory){
                props.addIncome(data)
            } else {
                //add categoryBudget validation here
                if(validateInteger(data.categoryBudget)){
                    props.addExpense(data)
                } else { return }
            }
        }

        //clear state value after sending data
        setCategoryName("")
        setCategoryBudget("")
    }

    
    const handleInput = (e) => {
        //dynamic state update based on input in textfield
        if(e.target.name === 'categoryNameField'){
            setCategoryName(e.target.value)
        } else {
            //this regex checks if value contains only numbers
            if(/^\d+$/.test(e.target.value) || e.target.value === ""){
                setCategoryBudget(e.target.value)
                if(showErrorMessage) {setShowErrorMessage(false)}
            } else {
                if(e.target.value !== ""){
                    setShowErrorMessage(true)
                }
                setCategoryBudget(e.target.value)
            }
        }
    }

    return (
        <Box className={classes.root} boxShadow={4}>
            <form onSubmit={handleSubmit} className={classes.formLayout}>
                {/* Input for category name */}

                <div className={classes.textFields}>
                    <TextField 
                    id='filled-basic' 
                    label='Category Name'
                    name='categoryNameField'
                    value={categoryName}
                    onChange={handleInput}/>

                {!isIncomeCategory &&
                    <TextField 
                    id='filled-basic' 
                    label='Monthly Budget (€)'
                    name='budgetValueField'
                    value={categoryBudget}
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

import { Box, TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core'

//TODO: Form UI changes - UI can be finalized.

const useStyles = makeStyles({
    root: {
        margin: '0.5%',
        padding: '1%',
        border: 'solid',
        borderWidth: '1px',
        height: '8rem'
    }, errorText: {
        color: 'red',
        fontSize: '0.8rem'
    }
})

const CategoryForm = (props) => {
    const [isIncomeCategory, setIsIncomeCategory] = useState(true)
    const [categoryName, setCategoryName] = useState("")
    const [categoryBudget, setCategoryBudget] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const classes = useStyles()

    const handleIncomeAdd = () => {
        props.addIncome()
    }
    //toggle between Income and Expenses categories
    const handleCategoryChange = () => {
        setIsIncomeCategory(!isIncomeCategory)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //build object with data from states
        
        //TODO: add input validation method to handleSubmit, handleSubmit should not continue if validation
        //method returns false. The validation method should accept the budget value and make sure it is
        //parseable to integer


        //send data to parent

        
        //clear state value after sending data
        setCategoryName("")
        setCategoryBudget("")
    }

    
    const handleInput = (e) => {
        //dynamic state update based on input in textfield
        if(e.target.name === 'categoryNameField'){
            setCategoryName(e.target.value)
        } else {
            //this regex 
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
        <Box>
            <form onSubmit={handleSubmit} className={classes.root}>
                {/* Input for category name */}

                <div>
                    <TextField 
                    id='filled-basic' 
                    label='Category Name'
                    name='categoryNameField'
                    value={categoryName}
                    onChange={handleInput}/>

                    <Button 
                    type="submit"
                    variant="contained"
                    color="primary">Add</Button>

                    <Button
                    variant='contained'
                    color='primary'
                    onClick={handleCategoryChange}>
                        {isIncomeCategory ? 'Income' : 'Expenses'}
                    </Button>
                </div>
                {!isIncomeCategory &&
                <div>
                    <TextField 
                    id='filled-basic' 
                    label='Monthly Budget'
                    name='budgetValueField'
                    value={categoryBudget}
                    onChange={handleInput}/>

                    {showErrorMessage && <p className={classes.errorText}>Invalid input!</p>}
                </div>}

            </form>
        </Box>
    )
}

export default CategoryForm

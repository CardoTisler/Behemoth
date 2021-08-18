import { Box, TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core'
//TODO: Add handleSubmit method that passes on category name and 
//if isIncomeCategory then pass set
//handleSubmit should take its data from the state in this component, while the TextField and
//radio button should manipulate that state

//TODO: Add new TextField to form that only shows up if isIncomeCategory is false.
//TODO: Add validation to the new TextField - should only accept numbers
//TODO: Add new hook for categoryBudgetValue

const useStyles = makeStyles({
    root: {
        margin: '0.5%',
        padding: '1%',
        border: 'solid',
        borderWidth: '1px'
    }
})

const CategoryForm = () => {
    const [isIncomeCategory, setIsIncomeCategory] = useState(true)
    const [categoryName, setCategoryName] = useState("")
    const classes = useStyles()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(categoryName)
        
        setCategoryName("")
    }

    const handleInput = (e) => {
        setCategoryName(e.target.value)
    }
    return (
        <Box>
            <form onSubmit={handleSubmit} className={classes.root}>
                {/* Input for category name */}
                <TextField 
                id='filled-basic' 
                label='Standard'
                value={categoryName}
                onChange={handleInput}/>

                <Button 
                type="submit"
                variant="contained"
                color="primary"> btn</Button>

            </form>
        </Box>
    )
}

export default CategoryForm

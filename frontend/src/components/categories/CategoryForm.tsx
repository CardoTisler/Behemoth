import { Box, TextField, Button, makeStyles } from '@material-ui/core'
import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCategory } from '../../redux/actions/categoryActions'
import { showError } from '../../redux/actions/errorActions'
import { hideSuccess, showSuccess } from '../../redux/actions/successActions'

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

interface formPayload {
    category: string,
    budget: string | number,
    isIncomeCategory: boolean
}
const addToDatabase = async (url: string, data: formPayload) => {
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
        return {status: 400, error: (err as Error).message}
    }
}

const CategoryForm: React.FC = () => {
    const classes = useStyles()
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [isIncomeCategory, setIsIncomeCategory] = useState(true)
    const [state, setState] = useState({
        category: '',
        budget: '',
    })
    const dispatch = useDispatch()
    
    const handleCategoryChange = () => {
        setIsIncomeCategory(!isIncomeCategory)
    }
    
    const handleSubmit = (e: Event) => {
        e.preventDefault()
        //build object with data from states
        const data = {category: state.category, budget: state.budget, isIncomeCategory}
        //TODO: add input validation method to handleSubmit, handleSubmit should not continue if validation
        //method returns false. The validation method should accept the budget value and make sure it is
        //parseable to integer
        
        addToDatabase('/categories/new', data).then((res) => {
            if(res.status === 200){
                dispatch(addCategory(res.addedItem, isIncomeCategory))
                dispatch(showSuccess(`New category added.`))
                setTimeout(()=>{dispatch(hideSuccess())}, 4000)
            } else if (res.status === 400){
                dispatch(showError(`Couldn't make API request.`, res.error))
            }
        }).catch(err => {
            dispatch(showError(`Couldn't make API request.`, err.message))
        })
        //clear state value after sending data
        setState({
            category: "",
            budget: ""
        })
    }

    
    const handleInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        //dynamic state update based on input in textfield
        if(e.target !== null){
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
    }

    return (
        <Box className={classes.root} boxShadow={4}>
            <form onSubmit={() => handleSubmit} className={classes.formLayout}>
                <div className={classes.textFields}>
                    <TextField 
                    label='Category Name'
                    name='categoryNameField'
                    value={state.category}
                    onChange={(e) => {handleInput(e)}}/>

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
                        type="submit"
                        variant="contained"
                        color="primary">Add</Button>

                        <Button
                        className={isIncomeCategory ? classes.incomeButton : classes.expensesButton}
                        variant='contained'
                        color='primary'
                        onClick={handleCategoryChange}>
                            {isIncomeCategory ? 'Income' : 'Expense'}
                        </Button>
                </div>
            </form>
        </Box>
    )
}

export default CategoryForm

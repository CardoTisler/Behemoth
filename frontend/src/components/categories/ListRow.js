import { makeStyles, ListItem, ListItemText, Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCategory } from '../../redux/actions/categoryActions'
import { showError } from '../../redux/actions/errorActions'
import { hideSuccess, showSuccess } from '../../redux/actions/successActions'

const useStyles = makeStyles({
    display: {
        display: 'flex'
    }, dontDisplay: {
        display: 'none'
    }
})

const removeFromDatabase = async (url) => {
    await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status === 200){
            return res
        } else if(res.status === 404 || res.status === 400){
            throw new Error(res.error)
        } else {
            throw new Error(`Couldn't read server response.`)
        }
    })
}

const updateTransactionCategories = async (newCategoryId, oldCategoryId) => {
    await fetch('/transactions/updatecategories/'.concat(oldCategoryId), {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({newCategoryId})
    }).then((res) => { 
        if(!res.status === 200){
            throw new Error(res.error)
        }
    }).catch(err => {
        throw new Error(err.message)
    })
}

const ListRow = (props) => {
    const classes = useStyles();
    const [showButton, setShowButton] = useState(false)
    const dispatch = useDispatch()
    const {category, _id} = props.element
    const { noneCategory } = useSelector(state => state.categoryReducer)
    
    const handleElementDelete = async () => {
        await removeFromDatabase('/categories/delete/'.concat(_id)).then( async () => {
            dispatch(deleteCategory(_id))
            
            await updateTransactionCategories(noneCategory._id, _id)
            .then(() => {
                dispatch(showSuccess(`Item deleted and transactions updated!`))
                setTimeout(() => {dispatch(hideSuccess())}, 4000)
            })
            .catch(err => {
                dispatch(showError(`Could not change transactions' category to NONE`, err.message))
            })
            //deleting category successful - find all transactions that had this category and
            //switch their linked category id to the NONE category id  
        }).catch(err => dispatch(showError(`Could not delete element.`, err.message)))
    }
    
    return (
        <ListItem button 
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}>
            <ListItemText primary={category}/>
                <Button
                className={showButton ? classes.display : classes.dontDisplay}
                onClick={handleElementDelete}
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                >
                Delete
                </Button>

        </ListItem>)
}



export default ListRow

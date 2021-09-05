import { makeStyles, ListItem, ListItemText, Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useState } from 'react'

const useStyles = makeStyles({
    display: {
        display: 'flex'
    }, dontDisplay: {
        display: 'none'
    }
})

const removeFromDatabase = async (url) => {
    try{
        const response = await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response.json()
    } catch (err) {
        console.log(err)
    }
}

const ListRow = (props) => {

    const [showButton, setShowButton] = useState(false)
    const classes = useStyles();

    const handleElementDelete = async () => {
        await removeFromDatabase('/categories/delete/'.concat(props.element._id)).then( (response) => {
            //if 200, send name of category to parent component and 
            //filter state array for everything except the name passed in method.
            if(response.status === 200){ props.deleteCategory(props.element.category) }
            else if (response.status === 400) { console.log('Deleting item from database failed due to error.') }
            else if (response.status === 404) { console.log(`Couldn't find element to delete.`) }
        }).catch(err => console.log(err))
    }
    
    return (
        <ListItem button 
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}>
            <ListItemText primary={props.element.category}/>
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

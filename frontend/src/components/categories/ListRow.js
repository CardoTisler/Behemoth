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
        //pass id of element to be deleted to backend.
        //if server returns OK status, then delete from props.

        //make request
        await removeFromDatabase('/categories/delete/'.concat(props.element._id)).then( (response) => {
            
            if(response.status === 200){ props.deleteCategory(props.element.category) }
            else if (response.status === 400) { console.log('Deleting item from database failed.') }
            else if (response.status === 404) { console.log(`Couldn't find element to delete.`) }
        }).catch(err => console.log(err))
        //if OK then this
        //if not ok then give UI pop up that delete was unsuccessful
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

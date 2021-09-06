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

// const response = await fetch(url, {
//     method: 'PUT',
//     mode: 'cors',
//     headers:{
//         'Content-Type':'application/json'
//     },
//     body: JSON.stringify({name})
// }).catch(err => {
//     console.error(err)
// })
// return response

const ListRow = (props) => {
    const {category, _id} = props.element
    const [showButton, setShowButton] = useState(false)
    const classes = useStyles();

    const handleElementDelete = async () => {
        await removeFromDatabase('/categories/delete/'.concat(_id)).then( async (response) => {
            //if 200, send name of category to parent component and 
            //filter state array for everything except the name passed in method.
            console.log('/transactions/update/'.concat(props.noneCategory._id))
            if(response.status === 200){
                await fetch('/transactions/update/'.concat(props.noneCategory._id), {
                    method: 'PUT',
                    mode: 'cors',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({idForSearch: _id})
                }).then(() => {
                    props.deleteCategory(category) 
                }).catch(err => {
                    console.error(err)
                })
                //deleting category successful - find all transactions that had this category and
                //switch their linked category id to the NONE category id
                //
            }
            else if (response.status === 400) { console.log('Deleting item from database failed due to error.') }
            else if (response.status === 404) { console.log(`Couldn't find element to delete.`) }
        }).catch(err => console.log(err))
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

import { makeStyles, Divider, List, ListItem, ListItemText, Box, Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useState } from 'react'

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(180deg , #3f51b5 30%, rgb(0 0 0 / 0%) 100%)',
        width: '50%',
        padding: '1%',
        margin: '0.5%'
    }, button: {
        //
    }
})

//TODO: Add onHover event for the Delete buttons.
//TODO: add deleteCategory method for onCLick event on Delete button

//TODO: Build CategoryHeader component
//TODO: Add onClick event for each list row so the value can be edited. Probably not a good a idea to 
//send it to the header component. After this event is configured, make sure clicking on the row doesnt 
//trigger the onDelete event and vice versa - probably have to disable bubbling/catching

const renderArrToListElements = (array, buttonClass) => {
    return array.map(element => {
    return(
        <ListItem button key={element}>
            <ListItemText primary={element} />
            <Button
            className={buttonClass}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            >
            Delete
            </Button>
        </ListItem>)
    })
}

const CategoryList = (props) => { 
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <List>
                <ListItem>
                    <ListItemText primary={props.listTitle} />
                </ListItem>
                <Divider />
    
                {renderArrToListElements(props.list, classes.button)}

            </List>
        </Box>
    )
}

CategoryList.defaultProps = {
    listTitle: 'List title unset'
}
//TODO: add PropType - check that incomeList array contains ONLY strings
export default CategoryList

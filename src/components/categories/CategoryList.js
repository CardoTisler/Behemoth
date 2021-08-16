import { Divider, List, ListItem, ListItemText, Box } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
// const [incomeList, setIncomeList] = useState([
//     'Salary', 'Investments', 'Other'
// ])

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(180deg , #3f51b5 30%, rgb(0 0 0 / 0%) 100%)',
        width: '50%',
        padding: '1%',
        margin: '0.5%'
    }
})

//TODO: add Delete button for each row to delete the category entry from array in parent
//Delete button should appear in the row with onHover event (onMouseEnter, onMouseLeave in react)
//TODO: add deleteCategory method for onCLick event on Delete button

//TODO: after categoryHeader component is built, clicking on category in List should open it in 
//the header element, giving the user the editing capability

const renderArrToListElements = (array) => {
    return array.map(element => {
    return(
        <ListItem button key={element}>
            <ListItemText primary={element} />
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
    
                {renderArrToListElements(props.list)}

            </List>
        </Box>
    )
}

CategoryList.defaultProps = {
    listTitle: 'List title unset'
}
//TODO: add PropType - check that incomeList array contains ONLY strings
export default CategoryList

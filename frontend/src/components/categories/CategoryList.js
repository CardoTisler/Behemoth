import { makeStyles, Divider, List, ListItem, ListItemText, Box } from '@material-ui/core'
import ListRow from './ListRow'

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(180deg , #3f51b5 30%, rgb(0 0 0 / 0%) 100%)',
        width: '100%'
    }
})

//TODO: Add onClick event for each list row so the value can be edited. Probably not a good a idea to 
//send it to the header component. After this event is configured, make sure clicking on the row doesnt 
//trigger the onDelete event and vice versa - probably have to disable bubbling/catching


const CategoryList = (props) => { 
    const classes = useStyles()

    const renderRows = () => {
        return props.listArr.map((element) => {
            return (<ListRow element={element} key={element._id} deleteCategory={props.deleteCategory}/>)
        })
    }

    return (
        <Box className={classes.root}>
            <List>
                <ListItem>
                    <ListItemText primary={props.listTitle} />
                </ListItem>
                <Divider />

                {renderRows()}

            </List>
        </Box>
    )
}

CategoryList.defaultProps = {
    listTitle: 'List title unset'
}
//TODO: add PropType - check that incomeList array contains ONLY strings
export default CategoryList

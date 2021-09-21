import { makeStyles, Divider, List, ListItem, ListItemText, Box } from '@material-ui/core'
import ListRow from './ListRow'
import { useDispatch } from 'react-redux'
import { showError } from '../../redux/actions/errorActions'
import { showInfo, hideInfo } from 'src/redux/actions/infoActions'
import { Category
 } from '../../../@types/CategoryTypes/category'
const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(180deg , #3f51b5 30%, rgb(0 0 0 / 0%) 100%)',
        width: '100%'
    }
})

//TODO: Add onClick event for each list row so the value can be edited. Probably not a good a idea to 
//send it to the header component. After this event is configured, make sure clicking on the row doesnt 
//trigger the onDelete event and vice versa - probably have to disable bubbling/catching

interface Props{
    listTitle: string,
    listArr: Category[]
}

const CategoryList: React.FC<Props> = (props) => { 
    const classes = useStyles()
    const {listTitle, listArr} = props
    const dispatch = useDispatch()

    const renderRows = () => {
        try{
            return listArr.map((element) => {
                return (<ListRow 
                    element={element} 
                    key={element._id} />)
            })
        } catch(err) {
            dispatch(showInfo('Did not find any categories.'))
            setTimeout(() => {dispatch(hideInfo())}, 4000)
        }
    }

    return (
        <Box className={classes.root}>
            <List>
                <ListItem>
                    <ListItemText primary={listTitle} />
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

export default CategoryList

import {Button, ListItem, ListItemText, makeStyles} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {Category} from "../../../@types/CategoryTypes/category";
import {removeFromDatabase} from "../../fetch/categories";
import {updateTransactionCategories} from "../../fetch/transactions";
import {deleteCategory} from "../../redux/actions/categoryActions";
import {showError} from "../../redux/actions/errorActions";
import {hideSuccess, showSuccess} from "../../redux/actions/successActions";
import {RootState} from "../../redux/reducers";

const useStyles = makeStyles({
    display: {
        display: "flex",
    }, dontDisplay: {
        display: "none",
    },
});

interface IProps {
    element: Category;
    key: string; // for React list rendering purposes
}

const ListRow: React.FC<IProps> = (props) => {
    const classes = useStyles();
    const [showButton, setShowButton] = useState(false);
    const dispatch = useDispatch();
    const {name, _id} = props.element;
    const {noneCategory} = useSelector((state: RootState) => state.categoryReducer);
    const handleElementDelete = async () => {
        await updateTransactionCategories(noneCategory._id, _id)
            .then(async () => {
                await removeFromDatabase(_id)
                    .then( () => {
                        dispatch(deleteCategory(_id));
                        dispatch(showSuccess(`Item deleted and transactions updated!`));
                        setTimeout(() => hideSuccess(), 4000);
                }).catch((err: Error) => {
                        dispatch(showError(`Could not remove category.`, err.message));
                    });
            }).catch((err: Error) => {
                dispatch(showError(`Could not change transactions' category to NONE`, err.message));
            });
    };
    return (
        <ListItem button
                  onMouseEnter={() => setShowButton(true)}
                  onMouseLeave={() => setShowButton(false)}>
            <ListItemText primary={name}/>
            <Button
                className={showButton ? classes.display : classes.dontDisplay}
                onClick={handleElementDelete}
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon/>}
            >
                Delete
            </Button>

        </ListItem>);
};

export default ListRow;

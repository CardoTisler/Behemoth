var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles, ListItem, ListItemText, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCategory } from '../../redux/actions/categoryActions';
import { showError } from '../../redux/actions/errorActions';
import { hideSuccess, showSuccess } from '../../redux/actions/successActions';
const useStyles = makeStyles({
    display: {
        display: 'flex'
    }, dontDisplay: {
        display: 'none'
    }
});
const removeFromDatabase = (url) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status === 200) {
            return res;
        }
        else if (res.status === 404 || res.status === 400) {
            throw new Error(res.statusText);
        }
        else {
            throw new Error(`Couldn't read server response.`);
        }
    });
});
const updateTransactionCategories = (newCategoryId, oldCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch('/transactions/updatecategories/'.concat(oldCategoryId), {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newCategoryId })
    }).then((res) => {
        if (res.status !== 200) {
            throw new Error(res.statusText);
        }
    }).catch(err => {
        throw new Error(err.message);
    });
});
const ListRow = (props) => {
    const classes = useStyles();
    const [showButton, setShowButton] = useState(false);
    const dispatch = useDispatch();
    const { category, _id } = props.element;
    const { noneCategory } = useSelector((state) => state.categoryReducer);
    const handleElementDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        yield removeFromDatabase('/categories/delete/'.concat(_id)).then(() => __awaiter(void 0, void 0, void 0, function* () {
            dispatch(deleteCategory(_id));
            yield updateTransactionCategories(noneCategory._id, _id)
                .then(() => {
                dispatch(showSuccess(`Item deleted and transactions updated!`));
                setTimeout(() => { dispatch(hideSuccess()); }, 4000);
            })
                .catch(err => {
                dispatch(showError(`Could not change transactions' category to NONE`, err.message));
            });
            //deleting category successful - find all transactions that had this category and
            //switch their linked category id to the NONE category id  
        })).catch(err => dispatch(showError(`Could not delete element.`, err.message)));
    });
    return (_jsxs(ListItem, Object.assign({ button: true, onMouseEnter: () => setShowButton(true), onMouseLeave: () => setShowButton(false) }, { children: [_jsx(ListItemText, { primary: category }, void 0), _jsx(Button, Object.assign({ className: showButton ? classes.display : classes.dontDisplay, onClick: handleElementDelete, variant: "contained", color: "secondary", startIcon: _jsx(DeleteIcon, {}, void 0) }, { children: "Delete" }), void 0)] }), void 0));
};
export default ListRow;

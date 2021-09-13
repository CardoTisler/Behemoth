import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles, Divider, List, ListItem, ListItemText, Box } from '@material-ui/core';
import ListRow from './ListRow';
import { useDispatch } from 'react-redux';
import { showError } from '../../redux/actions/errorActions';
const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(180deg , #3f51b5 30%, rgb(0 0 0 / 0%) 100%)',
        width: '100%'
    }
});
const CategoryList = (props) => {
    const classes = useStyles();
    const { listTitle, listArr } = props;
    const dispatch = useDispatch();
    const renderRows = () => {
        try {
            return listArr.map((element) => {
                return (_jsx(ListRow, { element: element }, element._id));
            });
        }
        catch (err) {
            dispatch(showError(`Failed loading `.concat(listTitle), err.message));
        }
    };
    return (_jsx(Box, Object.assign({ className: classes.root }, { children: _jsxs(List, { children: [_jsx(ListItem, { children: _jsx(ListItemText, { primary: listTitle }, void 0) }, void 0), _jsx(Divider, {}, void 0), renderRows()] }, void 0) }), void 0));
};
CategoryList.defaultProps = {
    listTitle: 'List title unset'
};
//TODO: add PropType - check that incomeList array contains ONLY strings
export default CategoryList;

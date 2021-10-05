import { Box, Divider, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { hideInfo, showInfo } from "src/redux/actions/infoActions";
import { Category } from "../../../@types/CategoryTypes/category";
import ListRow from "./ListRow";
const useStyles = makeStyles({
    root: {
        background: "linear-gradient(180deg , #3f51b5 30%, rgb(0 0 0 / 0%) 100%)",
        width: "100%",
    },
});

interface Props {
    listTitle: string;
    listArr: Category[];
}

const CategoryList: React.FC<Props> = (props) => {
    const classes = useStyles();
    const {listTitle, listArr} = props;
    const dispatch = useDispatch();

    const renderRows = () => {
        try {
            return listArr.map((element) => {
                return (<ListRow
                    element={element}
                    key={element._id} />);
            });
        } catch (err) {
            dispatch(showInfo("Did not find any categories."));
            setTimeout(() => {dispatch(hideInfo()); }, 4000);
        }
    };

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
    );
};

CategoryList.defaultProps = {
    listTitle: "List title unset",
};

export default CategoryList;

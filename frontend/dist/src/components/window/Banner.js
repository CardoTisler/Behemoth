import { jsx as _jsx } from "react/jsx-runtime";
import { makeStyles, Box } from '@material-ui/core';
const useStyles = makeStyles({
    root: {
        backgroundColor: '#3f51b5',
        textAlign: 'left',
        padding: '20px',
        fontSize: 20,
        color: 'whitesmoke'
    }
});
const Banner = (props) => {
    const { title } = props;
    const classes = useStyles();
    return (_jsx(Box, Object.assign({ className: classes.root, boxShadow: 4 }, { children: title }), void 0));
};
export default Banner;

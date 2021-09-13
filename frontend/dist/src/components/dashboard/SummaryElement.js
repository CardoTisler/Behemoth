import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
    root: {
        border: 'solid',
        borderWidth: '1px',
        borderColor: 'white',
        textAlign: 'center',
        width: '100%',
        padding: 10
    },
    value: {
        fontSize: '1.1rem'
    }
});
const SummaryElement = (props) => {
    const classes = useStyles();
    const { icon, text, value } = props;
    return (_jsxs(Card, Object.assign({ className: classes.root, elevation: 4 }, { children: [icon, _jsx(Typography, Object.assign({ gutterBottom: true, variant: "body1", component: "h2" }, { children: text }), void 0), _jsx(Typography, Object.assign({ gutterBottom: true, variant: 'h6', component: 'h2', color: "primary", className: classes.value }, { children: value }), void 0)] }), void 0));
};
export default SummaryElement;

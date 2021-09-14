var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
var useStyles = makeStyles({
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
var SummaryElement = function (props) {
    var classes = useStyles();
    var icon = props.icon, text = props.text, value = props.value;
    return (_jsxs(Card, __assign({ className: classes.root, elevation: 4 }, { children: [icon, _jsx(Typography, __assign({ gutterBottom: true, variant: "body1", component: "h2" }, { children: text }), void 0), _jsx(Typography, __assign({ gutterBottom: true, variant: 'h6', component: 'h2', color: "primary", className: classes.value }, { children: value }), void 0)] }), void 0));
};
export default SummaryElement;

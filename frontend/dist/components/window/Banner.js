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
import { jsx as _jsx } from "react/jsx-runtime";
import { makeStyles, Box } from '@material-ui/core';
var useStyles = makeStyles({
    root: {
        backgroundColor: '#3f51b5',
        textAlign: 'left',
        padding: '20px',
        fontSize: 20,
        color: 'whitesmoke'
    }
});
var Banner = function (props) {
    var title = props.title;
    var classes = useStyles();
    return (_jsx(Box, __assign({ className: classes.root, boxShadow: 4 }, { children: title }), void 0));
};
export default Banner;

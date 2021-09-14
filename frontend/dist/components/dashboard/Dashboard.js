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
import DateFilter from './DateFilter';
import SummaryPanels from './SummaryPanels';
import { makeStyles, Box } from '@material-ui/core';
import Graph from './Graph';
var useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        border: 'solid',
        borderWidth: '1px',
        borderColor: 'white',
        textAlign: 'center',
        width: '100%',
        padding: '20px',
    },
    header: {
        display: 'flex',
        flexDirection: 'row'
    }
});
var Dashboard = function () {
    var classes = useStyles();
    return (_jsxs(Box, __assign({ className: classes.root, boxShadow: 4 }, { children: [_jsxs("div", __assign({ className: classes.header }, { children: [_jsx(SummaryPanels, {}, void 0), _jsx(DateFilter, {}, void 0)] }), void 0), _jsx(Graph, {}, void 0)] }), void 0));
};
export default Dashboard;

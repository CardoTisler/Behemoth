import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DateFilter from './DateFilter';
import SummaryPanels from './SummaryPanels';
import { makeStyles, Box } from '@material-ui/core';
import Graph from './Graph';
const useStyles = makeStyles({
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
const Dashboard = () => {
    const classes = useStyles();
    return (_jsxs(Box, Object.assign({ className: classes.root, boxShadow: 4 }, { children: [_jsxs("div", Object.assign({ className: classes.header }, { children: [_jsx(SummaryPanels, {}, void 0), _jsx(DateFilter, {}, void 0)] }), void 0), _jsx(Graph, {}, void 0)] }), void 0));
};
export default Dashboard;

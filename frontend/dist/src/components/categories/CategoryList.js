"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@material-ui/core");
var ListRow_1 = __importDefault(require("./ListRow"));
var react_redux_1 = require("react-redux");
var errorActions_1 = require("../../redux/actions/errorActions");
var useStyles = (0, core_1.makeStyles)({
    root: {
        background: 'linear-gradient(180deg , #3f51b5 30%, rgb(0 0 0 / 0%) 100%)',
        width: '100%'
    }
});
var CategoryList = function (props) {
    var classes = useStyles();
    var listTitle = props.listTitle, listArr = props.listArr;
    var dispatch = (0, react_redux_1.useDispatch)();
    var renderRows = function () {
        try {
            return listArr.map(function (element) {
                return ((0, jsx_runtime_1.jsx)(ListRow_1.default, { element: element }, element._id));
            });
        }
        catch (err) {
            dispatch((0, errorActions_1.showError)("Failed loading ".concat(listTitle), err.message));
        }
    };
    return ((0, jsx_runtime_1.jsx)(core_1.Box, __assign({ className: classes.root }, { children: (0, jsx_runtime_1.jsxs)(core_1.List, { children: [(0, jsx_runtime_1.jsx)(core_1.ListItem, { children: (0, jsx_runtime_1.jsx)(core_1.ListItemText, { primary: listTitle }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(core_1.Divider, {}, void 0), renderRows()] }, void 0) }), void 0));
};
CategoryList.defaultProps = {
    listTitle: 'List title unset'
};
//TODO: add PropType - check that incomeList array contains ONLY strings
exports.default = CategoryList;

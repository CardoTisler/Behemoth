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
var styles_1 = require("@material-ui/core/styles");
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var useStyles = (0, styles_1.makeStyles)({
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
    return ((0, jsx_runtime_1.jsxs)(Card_1.default, __assign({ className: classes.root, elevation: 4 }, { children: [icon, (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ gutterBottom: true, variant: "body1", component: "h2" }, { children: text }), void 0), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ gutterBottom: true, variant: 'h6', component: 'h2', color: "primary", className: classes.value }, { children: value }), void 0)] }), void 0));
};
exports.default = SummaryElement;

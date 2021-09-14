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
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var styles_1 = require("@material-ui/core/styles");
var useStyles = (0, styles_1.makeStyles)({
    root: {
        //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        //background: '#3f51b5',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgb(148 124 129 / 11%)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        width: '100%',
        fontSize: '0.8rem'
    },
});
var NavButton = function (props) {
    var text = props.text, icon = props.icon, onClick = props.onClick;
    var classes = useStyles();
    var handleClick = function () {
        onClick(text);
    };
    return ((0, jsx_runtime_1.jsxs)(Button_1.default, __assign({ className: classes.root, variant: 'contained', color: 'primary', onClick: handleClick }, { children: [icon, text] }), void 0));
};
exports.default = NavButton;

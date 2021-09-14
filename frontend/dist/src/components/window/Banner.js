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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@material-ui/core");
var useStyles = (0, core_1.makeStyles)({
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
    return ((0, jsx_runtime_1.jsx)(core_1.Box, __assign({ className: classes.root, boxShadow: 4 }, { children: title }), void 0));
};
exports.default = Banner;

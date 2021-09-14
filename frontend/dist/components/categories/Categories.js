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
import { Grid } from "@material-ui/core";
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import { useSelector } from 'react-redux';
var Categories = function () {
    var _a = useSelector(function (state) { return state.categoryReducer; }), incomeCategories = _a.incomeCategories, expenseCategories = _a.expenseCategories;
    return (_jsxs(Grid, __assign({ container: true, spacing: 3 }, { children: [_jsx(Grid, __assign({ item: true, xs: 12, md: 12 }, { children: _jsx(Grid, __assign({ container: true, spacing: 3 }, { children: _jsx(Grid, __assign({ item: true, xs: 12, md: 6 }, { children: _jsx(CategoryForm, {}, void 0) }), void 0) }), void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 12, md: 6 }, { children: _jsx(CategoryList, { listTitle: 'Income Categories', listArr: incomeCategories }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 12, md: 6 }, { children: _jsx(CategoryList, { listTitle: 'Expenses Categories', listArr: expenseCategories }, void 0) }), void 0)] }), void 0));
};
export default Categories;

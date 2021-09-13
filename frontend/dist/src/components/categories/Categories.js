import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid } from "@material-ui/core";
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import { useSelector } from 'react-redux';
const Categories = () => {
    const { incomeCategories, expenseCategories } = useSelector((state) => state.categoryReducer);
    return (_jsxs(Grid, Object.assign({ container: true, spacing: 3 }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 12, md: 12 }, { children: _jsx(Grid, Object.assign({ container: true, spacing: 3 }, { children: _jsx(Grid, Object.assign({ item: true, xs: 12, md: 6 }, { children: _jsx(CategoryForm, {}, void 0) }), void 0) }), void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 12, md: 6 }, { children: _jsx(CategoryList, { listTitle: 'Income Categories', listArr: incomeCategories }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: 12, md: 6 }, { children: _jsx(CategoryList, { listTitle: 'Expenses Categories', listArr: expenseCategories }, void 0) }), void 0)] }), void 0));
};
export default Categories;

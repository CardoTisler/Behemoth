var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, Select } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTransactionsCategory } from "../../redux/actions/transactionActions";
import { showError } from "../../redux/actions/errorActions";
const handleCategoryUpdate = (newCategoryId, transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = '/transactions/update/'.concat(transactionId);
    const response = yield fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newCategoryId })
    }).catch(err => {
        return err;
    });
    return response;
});
const RowDropdown = (props) => {
    const [currentCategoryId, setCurrentCategoryId] = useState("0");
    const { transactionId, transactionCategoryId, transactionName } = props;
    const { incomeCategories, expenseCategories, noneCategory } = useSelector((state) => state.categoryReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        setCurrentCategoryId(transactionCategoryId);
    }, [transactionCategoryId]);
    const handleChange = (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (e.target !== null) {
            const newCategoryId = e.target.value;
            yield handleCategoryUpdate(newCategoryId, transactionId).then(res => {
                if (res.status === 200) {
                    setCurrentCategoryId(newCategoryId);
                    dispatch(updateTransactionsCategory(transactionName, newCategoryId));
                }
                else if (res.status === 400) {
                    dispatch(showError(`Couldn't update transaction category.`, res.error));
                }
            }).catch(err => {
                dispatch(showError(`Couldn't update transaction category.`, err.message));
            });
        }
    });
    const renderOptions = (categories) => {
        if (categories) {
            return categories.map((element) => {
                return (_jsx("option", Object.assign({ value: element._id }, { children: element.category }), element._id));
            });
        }
        dispatch(showError(`Loading categories dropdown for transactions failed.`, `No categories found.`));
    };
    return (_jsx(FormControl, { children: _jsxs(Select, Object.assign({ native: true, value: currentCategoryId, id: "categories-dropdown", onChange: () => handleChange }, { children: [_jsx("option", Object.assign({ value: noneCategory._id }, { children: "NONE" }), void 0), _jsx("optgroup", Object.assign({ label: "Income" }, { children: renderOptions(incomeCategories) }), void 0), _jsx("optgroup", Object.assign({ label: "Expense" }, { children: renderOptions(expenseCategories) }), void 0)] }), void 0) }, void 0));
};
export default RowDropdown;

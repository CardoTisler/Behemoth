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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles, ListItem, ListItemText, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCategory } from '../../redux/actions/categoryActions';
import { showError } from '../../redux/actions/errorActions';
import { hideSuccess, showSuccess } from '../../redux/actions/successActions';
var useStyles = makeStyles({
    display: {
        display: 'flex'
    }, dontDisplay: {
        display: 'none'
    }
});
var removeFromDatabase = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(url, {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        return res;
                    }
                    else if (res.status === 404 || res.status === 400) {
                        throw new Error(res.statusText);
                    }
                    else {
                        throw new Error("Couldn't read server response.");
                    }
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var updateTransactionCategories = function (newCategoryId, oldCategoryId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('/transactions/updatecategories/'.concat(oldCategoryId), {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newCategoryId: newCategoryId })
                }).then(function (res) {
                    if (res.status !== 200) {
                        throw new Error(res.statusText);
                    }
                }).catch(function (err) {
                    throw new Error(err.message);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var ListRow = function (props) {
    var classes = useStyles();
    var _a = useState(false), showButton = _a[0], setShowButton = _a[1];
    var dispatch = useDispatch();
    var _b = props.element, category = _b.category, _id = _b._id;
    var noneCategory = useSelector(function (state) { return state.categoryReducer; }).noneCategory;
    var handleElementDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, removeFromDatabase('/categories/delete/'.concat(_id)).then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    dispatch(deleteCategory(_id));
                                    return [4 /*yield*/, updateTransactionCategories(noneCategory._id, _id)
                                            .then(function () {
                                            dispatch(showSuccess("Item deleted and transactions updated!"));
                                            setTimeout(function () { dispatch(hideSuccess()); }, 4000);
                                        })
                                            .catch(function (err) {
                                            dispatch(showError("Could not change transactions' category to NONE", err.message));
                                        })
                                        //deleting category successful - find all transactions that had this category and
                                        //switch their linked category id to the NONE category id  
                                    ];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }).catch(function (err) { return dispatch(showError("Could not delete element.", err.message)); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs(ListItem, __assign({ button: true, onMouseEnter: function () { return setShowButton(true); }, onMouseLeave: function () { return setShowButton(false); } }, { children: [_jsx(ListItemText, { primary: category }, void 0), _jsx(Button, __assign({ className: showButton ? classes.display : classes.dontDisplay, onClick: handleElementDelete, variant: "contained", color: "secondary", startIcon: _jsx(DeleteIcon, {}, void 0) }, { children: "Delete" }), void 0)] }), void 0));
};
export default ListRow;

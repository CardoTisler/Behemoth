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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@material-ui/core");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var transactionActions_1 = require("../../redux/actions/transactionActions");
var errorActions_1 = require("../../redux/actions/errorActions");
var handleCategoryUpdate = function (newCategoryId, transactionId) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = '/transactions/update/'.concat(transactionId);
                return [4 /*yield*/, fetch(url, {
                        method: 'PUT',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ newCategoryId: newCategoryId })
                    }).catch(function (err) {
                        return err;
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
var RowDropdown = function (props) {
    var _a = (0, react_1.useState)("0"), currentCategoryId = _a[0], setCurrentCategoryId = _a[1];
    var transactionId = props.transactionId, transactionCategoryId = props.transactionCategoryId, transactionName = props.transactionName;
    var _b = (0, react_redux_1.useSelector)(function (state) { return state.categoryReducer; }), incomeCategories = _b.incomeCategories, expenseCategories = _b.expenseCategories, noneCategory = _b.noneCategory;
    var dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(function () {
        setCurrentCategoryId(transactionCategoryId);
    }, [transactionCategoryId]);
    var handleChange = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var newCategoryId_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(e.target !== null)) return [3 /*break*/, 2];
                    newCategoryId_1 = e.target.value;
                    return [4 /*yield*/, handleCategoryUpdate(newCategoryId_1, transactionId).then(function (res) {
                            if (res.status === 200) {
                                setCurrentCategoryId(newCategoryId_1);
                                dispatch((0, transactionActions_1.updateTransactionsCategory)(transactionName, newCategoryId_1));
                            }
                            else if (res.status === 400) {
                                dispatch((0, errorActions_1.showError)("Couldn't update transaction category.", res.error));
                            }
                        }).catch(function (err) {
                            dispatch((0, errorActions_1.showError)("Couldn't update transaction category.", err.message));
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var renderOptions = function (categories) {
        if (categories) {
            return categories.map(function (element) {
                return ((0, jsx_runtime_1.jsx)("option", __assign({ value: element._id }, { children: element.category }), element._id));
            });
        }
        dispatch((0, errorActions_1.showError)("Loading categories dropdown for transactions failed.", "No categories found."));
    };
    return ((0, jsx_runtime_1.jsx)(core_1.FormControl, { children: (0, jsx_runtime_1.jsxs)(core_1.Select, __assign({ native: true, value: currentCategoryId, id: "categories-dropdown", onChange: function () { return handleChange; } }, { children: [(0, jsx_runtime_1.jsx)("option", __assign({ value: noneCategory._id }, { children: "NONE" }), void 0), (0, jsx_runtime_1.jsx)("optgroup", __assign({ label: "Income" }, { children: renderOptions(incomeCategories) }), void 0), (0, jsx_runtime_1.jsx)("optgroup", __assign({ label: "Expense" }, { children: renderOptions(expenseCategories) }), void 0)] }), void 0) }, void 0));
};
exports.default = RowDropdown;

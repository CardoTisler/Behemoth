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
var categoryActions_1 = require("../../redux/actions/categoryActions");
var errorActions_1 = require("../../redux/actions/errorActions");
var successActions_1 = require("../../redux/actions/successActions");
var useStyles = (0, core_1.makeStyles)({
    root: {
        padding: '1rem',
        width: '100%',
        height: '8rem',
    }, formLayout: {
        display: 'flex',
        flexDirection: 'row'
    }, errorText: {
        color: 'red',
        fontSize: '0.8rem'
    }, buttonLayout: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        justifyContent: 'space-between',
        width: '8rem'
    }, textFields: {
        display: 'flex',
        flexDirection: 'column'
    }, incomeButton: {
        backgroundColor: 'green'
    }, expensesButton: {
        backgroundColor: 'red'
    }
});
var addToDatabase = function (url, data) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch(url, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.json()];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, { status: 400, error: err_1.message }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var CategoryForm = function () {
    var classes = useStyles();
    var _a = (0, react_1.useState)(false), showErrorMessage = _a[0], setShowErrorMessage = _a[1];
    var _b = (0, react_1.useState)(true), isIncomeCategory = _b[0], setIsIncomeCategory = _b[1];
    var _c = (0, react_1.useState)({
        category: '',
        budget: '',
    }), state = _c[0], setState = _c[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var handleCategoryChange = function () {
        setIsIncomeCategory(!isIncomeCategory);
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        //build object with data from states
        var data = { category: state.category, budget: state.budget, isIncomeCategory: isIncomeCategory };
        //TODO: add input validation method to handleSubmit, handleSubmit should not continue if validation
        //method returns false. The validation method should accept the budget value and make sure it is
        //parseable to integer
        addToDatabase('/categories/new', data).then(function (res) {
            if (res.status === 200) {
                dispatch((0, categoryActions_1.addCategory)(res.addedItem, isIncomeCategory));
                dispatch((0, successActions_1.showSuccess)("New category added."));
                setTimeout(function () { dispatch((0, successActions_1.hideSuccess)()); }, 4000);
            }
            else if (res.status === 400) {
                dispatch((0, errorActions_1.showError)("Couldn't make API request.", res.error));
            }
        }).catch(function (err) {
            dispatch((0, errorActions_1.showError)("Couldn't make API request.", err.message));
        });
        //clear state value after sending data
        setState({
            category: "",
            budget: ""
        });
    };
    var handleInput = function (e) {
        //dynamic state update based on input in textfield
        if (e.target !== null) {
            if (e.target.name === 'categoryNameField') {
                setState(__assign(__assign({}, state), { category: e.target.value }));
            }
            else {
                //this regex checks if value contains only numbers
                if (/^\d+$/.test(e.target.value) || e.target.value === "") {
                    setState(__assign(__assign({}, state), { budget: e.target.value }));
                    if (showErrorMessage) { //TODO: Replace with Material UI helpertext
                        setShowErrorMessage(false);
                    }
                }
                else {
                    if (e.target.value !== "") {
                        setShowErrorMessage(true);
                    }
                    setState(__assign(__assign({}, state), { budget: e.target.value }));
                }
            }
        }
    };
    return ((0, jsx_runtime_1.jsx)(core_1.Box, __assign({ className: classes.root, boxShadow: 4 }, { children: (0, jsx_runtime_1.jsxs)("form", __assign({ onSubmit: function () { return handleSubmit; }, className: classes.formLayout }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: classes.textFields }, { children: [(0, jsx_runtime_1.jsx)(core_1.TextField, { label: 'Category Name', name: 'categoryNameField', value: state.category, onChange: function (e) { handleInput(e); } }, void 0), !isIncomeCategory &&
                            (0, jsx_runtime_1.jsx)(core_1.TextField, { label: 'Monthly Budget (\u20AC)', name: 'budgetValueField', value: state.budget, onChange: handleInput }, void 0), showErrorMessage && (0, jsx_runtime_1.jsx)("p", __assign({ className: classes.errorText }, { children: "Invalid input!" }), void 0)] }), void 0), (0, jsx_runtime_1.jsxs)("div", __assign({ className: classes.buttonLayout }, { children: [(0, jsx_runtime_1.jsx)(core_1.Button, __assign({ type: "submit", variant: "contained", color: "primary" }, { children: "Add" }), void 0), (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ className: isIncomeCategory ? classes.incomeButton : classes.expensesButton, variant: 'contained', color: 'primary', onClick: handleCategoryChange }, { children: isIncomeCategory ? 'Income' : 'Expense' }), void 0)] }), void 0)] }), void 0) }), void 0));
};
exports.default = CategoryForm;

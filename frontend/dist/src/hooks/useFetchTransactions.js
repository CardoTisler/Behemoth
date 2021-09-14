"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetchTransactions = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var errorActions_1 = require("../redux/actions/errorActions");
var useFetchTransactions = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = (0, react_1.useState)([]), data = _a[0], setData = _a[1];
    var error = null;
    //TODO: getData is defined the same way in almost every place. Turn it into reusable method.
    var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('transactions/show')
                        .then(function (res) {
                        return res.json();
                    })
                        .catch(function (err) {
                        throw new Error(err.message);
                    })
                    //FIXME: Use appropriate async await system (like in ListRow.js)
                ];
                case 1: return [2 /*return*/, _a.sent()
                    //FIXME: Use appropriate async await system (like in ListRow.js)
                ];
            }
        });
    }); };
    //FIXME: Use appropriate async await system (like in ListRow.js)
    (0, react_1.useEffect)(function () {
        function fetch() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getData().then(function (res) {
                                if (res.status === 200) {
                                    setData(__spreadArray([], res.transactionsList, true));
                                }
                                else if (res.status === 400) {
                                    dispatch((0, errorActions_1.showError)("Couldn't get transactions from database.", res.statusText));
                                    error = res.statusText;
                                }
                            }).catch(function (err) { return error = err.statusMessage; })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        fetch();
    }, []);
    return { transactionsList: data, error: error };
};
exports.useFetchTransactions = useFetchTransactions;

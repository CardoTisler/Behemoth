"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
require("react-date-range/dist/styles.css"); // main style file
require("react-date-range/dist/theme/default.css"); // theme css file
var react_date_range_1 = require("react-date-range");
var DateFilter = function () {
    var handleSelect = function (date) {
        console.log(date); //native Date object
    };
    var selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    };
    return ((0, jsx_runtime_1.jsx)(react_date_range_1.DateRangePicker, { weekStartsOn: 1, ranges: [selectionRange], onChange: handleSelect }, void 0));
};
exports.default = DateFilter;

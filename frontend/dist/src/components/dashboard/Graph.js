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
var recharts_1 = require("recharts");
// import { Bar } from "recharts"
var data = [
    {
        name: 'Category 1', uv: 4000, pv: 12000, amt: 2400
    },
    {
        name: 'Category 2', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Category 3', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Category 4', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Category 5', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Category 6', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Category 7', uv: 3490, pv: 4300, amt: 2100,
    }
];
var Graph = function () {
    return ((0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, __assign({ width: '90%', height: 300 }, { children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, __assign({ data: data }, { children: [(0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }, void 0), (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "name" }, void 0), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}, void 0), (0, jsx_runtime_1.jsx)(recharts_1.Bar, { dataKey: "pv", fill: "#8884d8" }, void 0), (0, jsx_runtime_1.jsx)(recharts_1.Bar, { dataKey: "uv", fill: "#82ca9d" }, void 0)] }), void 0) }), void 0));
};
exports.default = Graph;
